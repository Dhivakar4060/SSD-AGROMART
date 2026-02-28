import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const CropYieldCalculator = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    cropType: "Wheat",
    area: "",
    areaUnit: "Acre",
    seedQuality: "High",
  });
  const [result, setResult] = useState(null);

  const cropYieldData = {
    Wheat: { avg: 15, unit: "Quintals" },
    Rice: { avg: 20, unit: "Quintals" },
    Tomato: { avg: 100, unit: "Quintals" },
    Potato: { avg: 80, unit: "Quintals" },
    Onion: { avg: 60, unit: "Quintals" },
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    const area = parseFloat(formData.area);
    if (!area) return;

    const crop = cropYieldData[formData.cropType];
    let yieldMultiplier = 1;

    if (formData.seedQuality === "High") yieldMultiplier = 1.2;
    if (formData.seedQuality === "Low") yieldMultiplier = 0.8;

    const estimatedYield = area * crop.avg * yieldMultiplier;
    const potentialRevenue = estimatedYield * (formData.cropType === "Wheat" ? 2200 : formData.cropType === "Rice" ? 4500 : 1500);

    setResult({
      yield: estimatedYield.toFixed(2),
      unit: crop.unit,
      revenue: potentialRevenue.toLocaleString("en-IN"),
    });
  };

  return (
    <div className="pb-5">
      <h3 className="fw-bold mb-4">{t("calculator.title")}</h3>

      <div className="row g-4">
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm p-4">
            <h5 className="fw-bold mb-4">{t("calculator.input_details")}</h5>
            <form onSubmit={handleCalculate}>
              <div className="mb-3">
                <label className="form-label">{t("calculator.select_crop")}</label>
                <select
                  className="form-select"
                  value={formData.cropType}
                  onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
                >
                  {Object.keys(cropYieldData).map((crop) => (
                    <option key={crop} value={crop}>
                      {crop}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">{t("calculator.farm_area")}</label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter area"
                    required
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  />
                  <select
                    className="form-select"
                    style={{ maxWidth: "120px" }}
                    value={formData.areaUnit}
                    onChange={(e) => setFormData({ ...formData, areaUnit: e.target.value })}
                  >
                    <option value="Acre">Acre</option>
                    <option value="Hectare">Hectare</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">{t("calculator.seed_quality")}</label>
                <div className="d-flex gap-3">
                  {["High", "Average", "Low"].map((quality) => (
                    <div className="form-check" key={quality}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="seedQuality"
                        id={quality}
                        checked={formData.seedQuality === quality}
                        onChange={() => setFormData({ ...formData, seedQuality: quality })}
                      />
                      <label className="form-check-label" htmlFor={quality}>
                        {quality}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn btn-success w-100 py-3 rounded-pill fw-bold">
                {t("calculator.calculate")}
              </button>
            </form>
          </div>
        </div>

        <div className="col-lg-7">
          {result ? (
            <div className="card border-0 shadow-sm p-4 h-100 bg-success bg-opacity-10">
              <h5 className="fw-bold mb-4 text-success">{t("calculator.result")}</h5>
              <div className="row g-4 text-center">
                <div className="col-md-6">
                  <div className="bg-white p-4 rounded shadow-sm">
                    <h6 className="text-muted small mb-2">{t("calculator.yield")}</h6>
                    <h2 className="fw-bold text-success mb-0">
                      {result.yield} <small className="fs-6">{result.unit}</small>
                    </h2>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="bg-white p-4 rounded shadow-sm">
                    <h6 className="text-muted small mb-2">{t("calculator.revenue")}</h6>
                    <h2 className="fw-bold text-primary mb-0">₹{result.revenue}</h2>
                  </div>
                </div>
              </div>

              <div className="mt-5 p-4 bg-white rounded shadow-sm">
                <h6 className="fw-bold mb-3">Yield Factors Analysis</h6>
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex align-items-center">
                    <div className="bg-success bg-opacity-10 p-2 rounded me-3">
                      <i className="bi bi-droplets text-success"></i>
                    </div>
                    <div>
                      <p className="mb-0 small fw-bold">Water Availability</p>
                      <p className="mb-0 text-muted extra-small">Based on current seasonal averages for {formData.cropType}.</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="bg-info bg-opacity-10 p-2 rounded me-3">
                      <i className="bi bi-thermometer-half text-info"></i>
                    </div>
                    <div>
                      <p className="mb-0 small fw-bold">Temperature Variance</p>
                      <p className="mb-0 text-muted extra-small">Current climate conditions are optimal for your area.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto pt-4 text-center">
                <small className="text-muted italic">
                  * This is an estimate based on average yield data. Actual results may vary.
                </small>
              </div>
            </div>
          ) : (
            <div className="card border-0 shadow-sm p-4 h-100 d-flex flex-column justify-content-center align-items-center text-center">
              <div className="bg-light p-5 rounded-circle mb-4">
                <i className="bi bi-calculator display-1 text-muted"></i>
              </div>
              <h4 className="fw-bold text-muted">Ready to Calculate</h4>
              <p className="text-muted">Enter your farm details to see estimated yield and potential revenue.</p>
            </div>
          )}
        </div>
      </div>
      <style>{`
        .extra-small { font-size: 0.75rem; }
      `}</style>
    </div>
  );
};

export default CropYieldCalculator;
