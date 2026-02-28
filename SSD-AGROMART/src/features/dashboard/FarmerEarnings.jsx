import React from "react";
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

const FarmerEarnings = () => {
  const earningsData = [
    { month: "Oct", amount: 28000, orders: 32 },
    { month: "Nov", amount: 32000, orders: 38 },
    { month: "Dec", amount: 41000, orders: 45 },
    { month: "Jan", amount: 35000, orders: 42 },
    { month: "Feb", amount: 45200, orders: 58 },
  ];

  const lineData = {
    labels: earningsData.map((d) => d.month),
    datasets: [
      {
        label: "Monthly Earnings (₹)",
        data: earningsData.map((d) => d.amount),
        borderColor: "#198754",
        backgroundColor: "rgba(25, 135, 84, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const doughnutData = {
    labels: ["Vegetables", "Grains", "Fruits"],
    datasets: [
      {
        data: [45, 35, 20],
        backgroundColor: ["#198754", "#ffc107", "#fd7e14"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="pb-5">
      <h3 className="fw-bold mb-4">Earnings & Analytics</h3>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 h-100 bg-success text-white">
            <h6 className="text-uppercase small fw-bold opacity-75">
              Total Revenue
            </h6>
            <h2 className="fw-bold mb-0">₹1,81,200</h2>
            <div className="mt-3 small">
              <i className="bi bi-arrow-up-right me-1"></i>
              <span>12% increase from last month</span>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 h-100 bg-white">
            <h6 className="text-uppercase small fw-bold text-muted">
              Pending Balance
            </h6>
            <h2 className="fw-bold mb-0 text-dark">₹12,450</h2>
            <button className="btn btn-success btn-sm mt-3 rounded-pill px-3">
              Withdraw Funds
            </button>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 h-100 bg-white">
            <h6 className="text-uppercase small fw-bold text-muted">
              Avg. Order Value
            </h6>
            <h2 className="fw-bold mb-0 text-dark">₹780</h2>
            <div className="mt-3 small text-success">
              <i className="bi bi-check-circle-fill me-1"></i>
              <span>Excellent performance</span>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm p-4">
            <h5 className="fw-bold mb-4">Revenue Trend</h5>
            <div style={{ height: "300px" }}>
              <Line data={lineData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4">
            <h5 className="fw-bold mb-4">Sales by Category</h5>
            <div
              style={{ height: "300px" }}
              className="d-flex align-items-center"
            >
              <Doughnut
                data={doughnutData}
                options={{ maintainAspectRatio: false, cutout: "70%" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm mt-4 overflow-hidden">
        <div className="card-header bg-white py-3">
          <h5 className="fw-bold mb-0">Recent Payouts</h5>
        </div>
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="bg-light">
              <tr>
                <th className="px-4">Date</th>
                <th>Reference ID</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4">Feb 15, 2026</td>
                <td className="text-muted">PAY-99281</td>
                <td className="fw-bold text-success">₹35,000</td>
                <td>
                  <span className="badge bg-success-subtle text-success border border-success-subtle">
                    Completed
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-4">Jan 12, 2026</td>
                <td className="text-muted">PAY-98102</td>
                <td className="fw-bold text-success">₹28,500</td>
                <td>
                  <span className="badge bg-success-subtle text-success border border-success-subtle">
                    Completed
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

export default FarmerEarnings;
