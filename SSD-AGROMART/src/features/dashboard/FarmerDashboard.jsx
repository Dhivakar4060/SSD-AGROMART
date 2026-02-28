import React from "react";
import { useTranslation } from "react-i18next";

const FarmerDashboard = () => {
  const { t } = useTranslation();
  const stats = [
    {
      title: t("dashboard.total_sales") || "Total Sales",
      value: "₹45,200",
      icon: "bi-cash-stack",
      color: "primary",
    },
    {
      title: t("dashboard.active_bids") || "Active Bids",
      value: "12",
      icon: "bi-hammer",
      color: "warning",
    },
    {
      title: t("dashboard.pending_orders") || "Pending Orders",
      value: "5",
      icon: "bi-clock-history",
      color: "info",
    },
    {
      title: t("dashboard.total_products") || "Total Products",
      value: "24",
      icon: "bi-box-seam",
      color: "success",
    },
  ];

  return (
    <div>
      <h3 className="fw-bold mb-4">
        {t("dashboard.farmer_overview") || "Farmer Dashboard Overview"}
      </h3>

      <div className="row g-4 mb-5">
        {stats.map((stat, index) => (
          <div className="col-md-3" key={index}>
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div
                    className={`bg-${stat.color} bg-opacity-10 p-3 rounded-circle`}
                  >
                    <i
                      className={`bi ${stat.icon} text-${stat.color} fs-4`}
                    ></i>
                  </div>
                  <span className="text-muted small">
                    {t("dashboard.this_month") || "This Month"}
                  </span>
                </div>
                <h4 className="fw-bold mb-1">{stat.value}</h4>
                <p className="text-muted mb-0 small">{stat.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">
                {t("dashboard.recent_activity") || "Recent Product Activity"}
              </h5>
            </div>
            <div className="card-body">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>{t("dashboard.product") || "Product"}</th>
                    <th>{t("dashboard.price") || "Price"}</th>
                    <th>{t("dashboard.stock") || "Stock"}</th>
                    <th>{t("dashboard.status") || "Status"}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Organic Tomatoes</td>
                    <td>₹40/kg</td>
                    <td>200kg</td>
                    <td>
                      <span className="badge bg-success">
                        {t("dashboard.active") || "Active"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Basmati Rice</td>
                    <td>₹120/kg</td>
                    <td>500kg</td>
                    <td>
                      <span className="badge bg-success">
                        {t("dashboard.active") || "Active"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Fresh Mangoes</td>
                    <td>₹150/kg</td>
                    <td>0kg</td>
                    <td>
                      <span className="badge bg-danger">
                        {t("dashboard.out_of_stock") || "Out of Stock"}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">
                {t("dashboard.upcoming_bids") || "Upcoming Bids"}
              </h5>
            </div>
            <div className="card-body">
              <div className="d-flex flex-column gap-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="p-3 bg-light rounded border-start border-warning border-4"
                  >
                    <h6 className="mb-1 fw-bold">Wheat Auction #{1020 + i}</h6>
                    <small className="text-muted">
                      {t("dashboard.ends_in") || "Ends in"}: 4h 20m
                    </small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
