import React from "react";
import { useTranslation } from "react-i18next";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const { t } = useTranslation();
  const stats = [
    {
      label: t("admin.total_revenue") || "Total Revenue",
      value: "₹12.5L",
      icon: "bi-currency-rupee",
      color: "primary",
      trend: "+15%",
    },
    {
      label: t("admin.active_farmers") || "Active Farmers",
      value: "1,240",
      icon: "bi-person-badge",
      color: "success",
      trend: "+8%",
    },
    {
      label: t("admin.total_customers") || "Total Customers",
      value: "8,500",
      icon: "bi-people",
      color: "info",
      trend: "+22%",
    },
    {
      label: t("admin.pending_verifications") || "Pending Verifications",
      value: "42",
      icon: "bi-patch-check",
      color: "warning",
      trend: "-5%",
    },
  ];

  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: t("admin.revenue_label") || "Revenue 2026 (₹)",
        data: [450000, 520000, 480000, 610000, 590000, 750000],
        borderColor: "#0d6efd",
        backgroundColor: "rgba(13, 110, 253, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const userDistData = {
    labels: [
      t("admin.role_farmer") || "Farmers",
      t("admin.role_customer") || "Customers",
      t("admin.role_admin") || "Admins",
    ],
    datasets: [
      {
        data: [1240, 8500, 15],
        backgroundColor: ["#198754", "#0dcaf0", "#6c757d"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="pb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0">
          {t("admin.platform_overview") || "Platform Overview"}
        </h3>
        <button className="btn btn-primary shadow-sm rounded-pill px-3">
          <i className="bi bi-download me-2"></i>
          {t("admin.export_report") || "Export Report"}
        </button>
      </div>

      <div className="row g-4 mb-5">
        {stats.map((stat, i) => (
          <div key={i} className="col-md-3">
            <div className="card border-0 shadow-sm p-4 h-100 transition-up">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className={`bg-${stat.color} bg-opacity-10 p-3 rounded-4`}>
                  <i className={`bi ${stat.icon} text-${stat.color} fs-4`}></i>
                </div>
                <span
                  className={`badge bg-${
                    stat.trend.startsWith("+") ? "success" : "danger"
                  }-subtle text-${
                    stat.trend.startsWith("+") ? "success" : "danger"
                  } rounded-pill`}
                >
                  {stat.trend}
                </span>
              </div>
              <h6 className="text-muted small text-uppercase fw-bold mb-1">
                {stat.label}
              </h6>
              <h2 className="fw-bold mb-0">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">
                {t("admin.revenue_growth") || "Revenue Growth"}
              </h5>
              <select className="form-select form-select-sm w-auto border-0 bg-light">
                <option>{t("admin.last_6_months") || "Last 6 Months"}</option>
                <option>{t("admin.last_year") || "Last Year"}</option>
              </select>
            </div>
            <div style={{ height: "350px" }}>
              <Line data={salesData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4">
            <h5 className="fw-bold mb-4">
              {t("admin.user_distribution") || "User Distribution"}
            </h5>
            <div
              style={{ height: "350px" }}
              className="d-flex align-items-center justify-content-center"
            >
              <Doughnut
                data={userDistData}
                options={{
                  maintainAspectRatio: false,
                  plugins: { legend: { position: "bottom" } },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm mt-5 overflow-hidden">
        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Recent High-Value Transactions</h5>
          <button className="btn btn-link text-decoration-none text-primary p-0 small fw-bold">
            View All
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="bg-light">
              <tr>
                <th className="px-4">Order ID</th>
                <th>Farmer</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Date</th>
                <th className="text-end px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 fw-bold">#ORD-9912</td>
                <td>Suresh Patel</td>
                <td>Amit Singh</td>
                <td className="fw-bold">₹42,500</td>
                <td className="text-muted">Jun 12, 2026</td>
                <td className="text-end px-4">
                  <span className="badge bg-success-subtle text-success">
                    Completed
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-4 fw-bold">#ORD-9908</td>
                <td>Rajesh Kumar</td>
                <td>Anita Sharma</td>
                <td className="fw-bold">₹18,200</td>
                <td className="text-muted">Jun 10, 2026</td>
                <td className="text-end px-4">
                  <span className="badge bg-warning-subtle text-warning">
                    Pending
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
