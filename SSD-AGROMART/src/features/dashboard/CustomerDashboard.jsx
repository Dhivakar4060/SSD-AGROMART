import React from "react";
import { useTranslation } from "react-i18next";

const CustomerDashboard = () => {
  const { t } = useTranslation();
  const stats = [
    {
      title: t("customer.total_orders"),
      value: "8",
      icon: "bi-bag-check",
      color: "success",
    },
    {
      title: t("customer.wishlist_items"),
      value: "15",
      icon: "bi-heart",
      color: "danger",
    },
    {
      title: t("customer.reward_points"),
      value: "450",
      icon: "bi-star",
      color: "warning",
    },
    {
      title: t("customer.pending_delivery"),
      value: "2",
      icon: "bi-truck",
      color: "info",
    },
  ];

  return (
    <div>
      <h3 className="fw-bold mb-4">{t("customer.welcome_back")}</h3>

      <div className="row g-4 mb-5">
        {stats.map((stat, index) => (
          <div className="col-md-3" key={index}>
            <div className="card border-0 shadow-sm h-100 transition-up">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div
                    className={`bg-${stat.color} bg-opacity-10 p-3 rounded-circle`}
                  >
                    <i
                      className={`bi ${stat.icon} text-${stat.color} fs-4`}
                    ></i>
                  </div>
                </div>
                <h4 className="fw-bold mb-1">{stat.value}</h4>
                <p className="text-muted mb-0 small">{stat.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">
                {t("customer.track_recent_orders")}
              </h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>{t("customer.order_id")}</th>
                      <th>{t("customer.date")}</th>
                      <th>{t("customer.amount")}</th>
                      <th>{t("customer.status")}</th>
                      <th>{t("customer.action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="fw-bold text-success">#ORD-8821</td>
                      <td className="text-muted small">Feb 20, 2026</td>
                      <td className="fw-bold">₹1,200</td>
                      <td>
                        <span className="badge bg-info rounded-pill">
                          {t("order_status.in_transit")}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary rounded-pill px-3">
                          {t("customer.track")}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold text-success">#ORD-8755</td>
                      <td className="text-muted small">Feb 15, 2026</td>
                      <td className="fw-bold">₹450</td>
                      <td>
                        <span className="badge bg-success rounded-pill">
                          {t("order_status.delivered")}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-secondary rounded-pill px-3">
                          {t("customer.invoice")}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
