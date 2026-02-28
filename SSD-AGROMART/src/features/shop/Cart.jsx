import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import orderService from "../../services/orderService";
import PaymentModal from "../../components/common/PaymentModal";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const { t } = useTranslation();
  const { cartItems, removeFromCart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);

  const handleCheckout = () => {
    if (!user) {
      navigate("/login", { state: { from: "/cart" } });
      return;
    }
    setShowPayment(true);
  };

  const processOrder = async () => {
    try {
      const insufficient = cartItems.find((item) => item.stock !== undefined && item.quantity > item.stock);
      if (insufficient) {
        alert(`Insufficient stock for ${insufficient.name}. Available: ${insufficient.stock}, requested: ${insufficient.quantity}`);
        return;
      }
      const items = cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));
      await orderService.placeOrder(user.id, items, "Nagpur, MH (Default)");
      setShowPayment(false);
      alert(t("cart.payment_success"));
      clearCart();
      navigate("/customer/orders");
    } catch (error) {
      const msg = error.response?.data?.message || t("cart.order_failed");
      alert(msg);
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Navbar />

      {/* Full-width content */}
      <div className="w-100 py-5 flex-grow-1 p-2" style={{ maxWidth: "100vw" }}>
        <h2 className="fw-bold mb-5 text-center">{t("cart.title")}</h2>

        {cartItems.length === 0 ? (
          <div className="card border-0 shadow-sm p-5 text-center mx-auto" style={{ maxWidth: "600px" }}>
            <i className="bi bi-cart-x display-1 text-muted mb-4"></i>
            <h3>{t("cart.empty")}</h3>
            <p className="text-muted">{t("cart.empty_desc")}</p>
            <Link to="/shop" className="btn btn-success px-4 mt-3">
              {t("cart.start_shopping")}
            </Link>
          </div>
        ) : (
          <div className="d-flex flex-wrap gap-4 justify-content-center">
            {/* Cart Items - full width */}
            <div className="flex-grow-1" style={{ minWidth: "65%" }}>
              <div className="card border-0 shadow-sm w-100 p-2">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0 w-100">
                    <thead className="table-light">
                      <tr>
                        <th className="px-4 py-3">{t("cart.product")}</th>
                        <th>{t("cart.price")}</th>
                        <th>{t("cart.quantity")}</th>
                        <th>{t("cart.total")}</th>
                        <th className="text-center">{t("cart.action")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-3">
                            <div className="d-flex align-items-center">
                              <div
                                className="bg-light rounded p-2 me-3"
                                style={{ width: "60px", height: "60px" }}
                              >
                                {item.imageUrl ? (
                                  <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="w-100 h-100 object-fit-cover rounded"
                                  />
                                ) : (
                                  <i className="bi bi-image text-muted fs-4"></i>
                                )}
                              </div>
                              <div>
                                <h6 className="mb-0 fw-bold">{item.name}</h6>
                                <small className="text-muted">
                                  {t(`shop.categories.${item.category.toLowerCase()}`)}
                                </small>
                              </div>
                            </div>
                          </td>
                          <td>₹{item.price}</td>
                          <td>{item.quantity} {item.unit}</td>
                          <td className="fw-bold text-success">₹{item.price * item.quantity}</td>
                          <td className="text-center">
                            <button
                              className="btn btn-link text-danger p-0"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <i className="bi bi-trash fs-5"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Cart Actions */}
                <div className="d-flex justify-content-between mt-3">
                  <Link to="/shop" className="btn btn-outline-success">
                    <i className="bi bi-arrow-left me-2"></i>{t("cart.continue_shopping")}
                  </Link>
                  <button className="btn btn-outline-danger" onClick={clearCart}>
                    {t("cart.clear_cart")}
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary - full height */}
            <div style={{ minWidth: "30%", maxWidth: "400px" }}>
              <div className="card border-0 shadow-sm p-4 h-100">
                <h5 className="fw-bold mb-4">{t("cart.order_summary")}</h5>

                <div className="d-flex justify-content-between mb-3">
                  <span>{t("cart.subtotal")}</span>
                  <span>₹{cartTotal}</span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span>{t("cart.delivery_fee")}</span>
                  <span className="text-success">{t("cart.free")}</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-4">
                  <span className="fw-bold">{t("cart.total")}</span>
                  <span className="fw-bold fs-4 text-success">₹{cartTotal}</span>
                </div>

                <button
                  className="btn btn-success w-100 py-3 fw-bold rounded-3 mb-3"
                  onClick={handleCheckout}
                >
                  {t("cart.proceed_checkout")}
                </button>

                <div className="text-center text-muted small">
                  <i className="bi bi-shield-check me-1"></i> {t("cart.secure_checkout")}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />

      {/* Payment Modal */}
      <PaymentModal
        show={showPayment}
        onHide={() => setShowPayment(false)}
        onConfirm={processOrder}
        amount={cartTotal}
      />
    </div>
  );
};

export default Cart;
