import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import api from "../../app/axiosConfig";
import { useTranslation } from "react-i18next";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const MarketInsights = () => {
  const { t } = useTranslation();
  const [prices, setPrices] = useState([]);
  const [trends, setTrends] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pricesRes, trendsRes] = await Promise.all([
          api.get("/market-insights/prices"),
          api.get("/market-insights/trends"),
        ]);
        setPrices(pricesRes.data);
        setTrends(trendsRes.data);
      } catch (error) {
        console.error("Failed to fetch market insights", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0">{t("insights.title")}</h3>
        <span className="badge bg-info text-dark p-2 rounded-pill px-3">
          <i className="bi bi-clock-history me-1"></i> {t("insights.updated")}
        </span>
      </div>

      <div className="row g-4 mb-5">
        {prices.map((item, index) => (
          <div className="col-md-4 col-lg-3" key={index}>
            <div className="card border-0 shadow-sm p-4 text-center">
              <h6 className="text-muted text-uppercase small mb-2">
                {item.crop}
              </h6>
              <h3 className="fw-bold mb-1">
                ₹{item.currentPrice}{" "}
                <small className="fs-6 text-muted">/ {item.unit}</small>
              </h3>
              <div
                className={`fw-bold small ${
                  item.status === "UP" ? "text-success" : "text-danger"
                }`}
              >
                <i
                  className={`bi bi-arrow-${
                    item.status === "UP" ? "up" : "down"
                  }-right me-1`}
                ></i>
                {item.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm p-4">
            <h5 className="fw-bold mb-4">{t("insights.performance")}</h5>
            {trends && (
              <div style={{ height: "350px" }}>
                <Line
                  data={trends}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { position: "top" },
                    },
                    scales: {
                      y: {
                        beginAtZero: false,
                        grid: { color: "#f8f9fa" },
                      },
                      x: {
                        grid: { display: false },
                      },
                    },
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4 bg-success text-white">
            <h5 className="fw-bold mb-3">{t("insights.advice")}</h5>
            <div className="d-flex flex-column gap-3">
              <div className="bg-white bg-opacity-20 p-3 rounded">
                <h6 className="fw-bold mb-1">Wheat Selling Strategy</h6>
                <p className="small mb-0">
                  Prices are expected to rise by 5-7% next month. Consider
                  holding for better returns.
                </p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded">
                <h6 className="fw-bold mb-1">Tomato Harvest Alert</h6>
                <p className="small mb-0">
                  Surplus arrival in local markets. Sell immediate harvest to
                  avoid spoilage and price drops.
                </p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded">
                <h6 className="fw-bold mb-1">Fertilizer Subsidy</h6>
                <p className="small mb-0">
                  New government subsidy scheme announced for organic
                  fertilizers. Check with your local nodal office.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketInsights;
