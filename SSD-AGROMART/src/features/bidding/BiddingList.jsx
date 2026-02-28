import React, { useState, useEffect } from "react";
import biddingService from "../../services/biddingService";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { useTranslation } from "react-i18next";

const BiddingList = () => {
  const { t } = useTranslation();
  const [auctions, setAuctions] = useState([]);
  const [bidAmounts, setBidAmounts] = useState({});
  const { user } = useAuth();

  const [showNewAuctionModal, setShowNewAuctionModal] = useState(false);
  const [newAuctionData, setNewAuctionData] = useState({
    cropName: "",
    quantity: "",
    basePrice: "",
    image: null,
    preview: null,
  });
  const [savingAuction, setSavingAuction] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    loadAuctions();
    const interval = setInterval(loadAuctions, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setAuctions((prev) =>
        prev.map((a) => ({
          ...a,
          secondsLeft: Math.max(0, (a.secondsLeft || 3600) - 1),
        }))
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const loadAuctions = async () => {
    try {
      const data = await biddingService.getActiveAuctions();
      setAuctions(
        data.map((a) => ({
          ...a,
          secondsLeft: a.secondsLeft || Math.floor(Math.random() * 36000),
        }))
      );
    } catch (error) {
      console.error("Failed to load auctions", error);
    }
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const handleBidChange = (auctionId, value) => {
    setBidAmounts({ ...bidAmounts, [auctionId]: value });
  };

  const handlePlaceBid = async (auctionId, currentBid) => {
    const amount = parseFloat(bidAmounts[auctionId]);
    if (!amount || amount <= currentBid) {
      alert(t("bidding.bid_error") || "Bid must be higher than current bid");
      return;
    }
    if (!user) {
      alert(t("bidding.login_error") || "Please login first");
      return;
    }
    try {
      await biddingService.placeBid(auctionId, user.id, amount);
      alert(t("bidding.bid_success") || "Bid placed successfully");
      loadAuctions();
      setBidAmounts({ ...bidAmounts, [auctionId]: "" });
    } catch (error) {
      alert(error.response?.data?.message || t("common.failed") || "Failed");
    }
  };

  // === NEW AUCTION HANDLERS ===
  const handleNewAuctionChange = (e) => {
    const { name, value } = e.target;
    setNewAuctionData({ ...newAuctionData, [name]: value });
  };

  const handleNewAuctionFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewAuctionData({
        ...newAuctionData,
        image: file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmitNewAuction = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!newAuctionData.cropName?.trim()) errors.cropName = "Crop name required";
    if (!newAuctionData.quantity || Number(newAuctionData.quantity) <= 0)
      errors.quantity = "Quantity must be greater than 0";
    if (!newAuctionData.basePrice || Number(newAuctionData.basePrice) <= 0)
      errors.basePrice = "Base price must be greater than 0";

    setFormErrors(errors);
    if (Object.keys(errors).length) return;

    try {
      setSavingAuction(true);
      const auctionPayload = {
        cropName: newAuctionData.cropName.trim(),
        quantity: Number(newAuctionData.quantity),
        basePrice: Number(newAuctionData.basePrice),
        image: newAuctionData.image || null,
      };
      await biddingService.addAuction(auctionPayload);
      alert("Auction started successfully");
      setShowNewAuctionModal(false);
      setNewAuctionData({ cropName: "", quantity: "", basePrice: "", image: null, preview: null });
      loadAuctions();
    } catch (error) {
      console.error("Failed to start auction:", error);
      alert(error.response?.data?.message || "Failed to start auction");
    } finally {
      setSavingAuction(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(t("bidding.confirm_delete") || "Are you sure you want to delete this auction?")) {
      try {
        await biddingService.deleteAuction(id);
        loadAuctions();
      } catch (error) {
        console.error("Failed to delete auction:", error);
      }
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Navbar />

      <div className="container py-5 flex-grow-1">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
          <div>
            <h2 className="fw-bold mb-0">{t("bidding.title")}</h2>
            <p className="text-muted">{t("bidding.subtitle")}</p>
          </div>
          {user?.role === "FARMER" && (
            <button
              className="btn btn-success rounded-pill px-4 shadow-sm mt-2"
              onClick={() => setShowNewAuctionModal(true)}
            >
              <i className="bi bi-megaphone me-2"></i> {t("bidding.start_new")}
            </button>
          )}
        </div>

        {/* Auctions */}
        <div className="row g-4">
          {auctions.length > 0 ? auctions.map((auction) => (
            <div className="col-md-6 col-lg-4" key={auction.id}>
              <div className="card border-0 shadow-sm h-100 auction-card overflow-hidden">
                <div className="bg-success bg-opacity-10 p-4 text-center position-relative">
                  <i className="bi bi-hammer display-4 text-success mb-2 d-block"></i>
                  <div className="position-absolute top-0 end-0 p-2">
                    <span className="badge bg-danger pulse-animation rounded-pill">
                      {t("bidding.live")}
                    </span>
                  </div>
                  <div className="mt-2 fw-bold text-dark">
                    <i className="bi bi-clock-fill me-1 text-danger"></i>
                    {formatTime(auction.secondsLeft)}
                  </div>
                </div>

                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title fw-bold mb-0">{auction.cropName}</h5>
                    <span className="badge bg-light text-dark border">{auction.quantity}</span>
                  </div>
                  <p className="small text-muted mb-3">
                    {t("bidding.farmer")}:{" "}
                    <span className="text-dark fw-medium">{auction.farmer}</span>
                  </p>

                  <div className="row mb-4 bg-light p-3 rounded-3 g-0">
                    <div className="col-6 border-end text-center">
                      <small className="text-muted d-block text-uppercase smaller fw-bold">{t("bidding.base_price")}</small>
                      <span className="fw-bold">₹{auction.basePrice}</span>
                    </div>
                    <div className="col-6 text-center">
                      <small className="text-muted d-block text-uppercase smaller fw-bold">{t("bidding.current_bid")}</small>
                      <span className="fw-bold text-success fs-5">₹{auction.currentBid}</span>
                    </div>
                  </div>

                  <div className="input-group mb-3 shadow-sm rounded-pill overflow-hidden border">
                    <span className="input-group-text bg-white border-0 ps-3">₹</span>
                    <input
                      type="number"
                      className="form-control border-0"
                      placeholder={t("bidding.bid_placeholder")}
                      value={bidAmounts[auction.id] || ""}
                      onChange={(e) => handleBidChange(auction.id, e.target.value)}
                      style={{ fontSize: "14px" }}
                    />
                    <button
                      className="btn btn-success px-4 fw-bold"
                      onClick={() => handlePlaceBid(auction.id, auction.currentBid)}
                    >
                      {t("bidding.bid_button")}
                    </button>
                  </div>

                  <button className="btn btn-outline-success btn-sm w-100 rounded-pill border-0" onClick={() => handleDelete(auction.id)}>
                    {t("bidding.history") || "Delete"}
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-12 text-center py-5">
              <i className="bi bi-gavel display-1 text-muted opacity-25"></i>
              <h4 className="mt-3 text-muted">{t("bidding.no_auctions")}</h4>
            </div>
          )}
        </div>
      </div>

      {/* New Auction Modal */}
      {showNewAuctionModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4">
              <h5>{t("bidding.start_new")}</h5>
              <form onSubmit={handleSubmitNewAuction} encType="multipart/form-data">
                <div className="mb-3">
                  <label>{t("bidding.crop_name") || "Crop Name"}</label>
                  <input type="text" name="cropName" className="form-control" value={newAuctionData.cropName} onChange={handleNewAuctionChange} />
                  {formErrors.cropName && <small className="text-danger">{formErrors.cropName}</small>}
                </div>
                <div className="mb-3">
                  <label>{t("bidding.quantity") || "Quantity"}</label>
                  <input type="number" name="quantity" className="form-control" value={newAuctionData.quantity} onChange={handleNewAuctionChange} />
                  {formErrors.quantity && <small className="text-danger">{formErrors.quantity}</small>}
                </div>
                <div className="mb-3">
                  <label>{t("bidding.base_price") || "Base Price"}</label>
                  <input type="number" name="basePrice" className="form-control" value={newAuctionData.basePrice} onChange={handleNewAuctionChange} />
                  {formErrors.basePrice && <small className="text-danger">{formErrors.basePrice}</small>}
                </div>
                <div className="mb-3">
                  <label>{t("bidding.image") || "Image"}</label>
                  <input type="file" accept="image/*" className="form-control" onChange={handleNewAuctionFile} />
                  {newAuctionData.preview && <img src={newAuctionData.preview} alt="Preview" className="img-fluid mt-2 rounded" style={{ maxHeight: 150 }} />}
                </div>
                <div className="d-flex justify-content-end gap-2">
                  <button type="button" className="btn btn-light" onClick={() => setShowNewAuctionModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-success" disabled={savingAuction}>
                    {savingAuction ? "Saving..." : t("bidding.start_new")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />

      <style>{`
        .smaller { font-size: 0.7rem; }
        .auction-card { transition: transform 0.2s; }
        .auction-card:hover { transform: translateY(-5px); }
        .pulse-animation { animation: pulse 2s infinite; }
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.8; }
          70% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default BiddingList;
