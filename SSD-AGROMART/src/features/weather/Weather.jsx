import React, { useState } from "react";
import Navbar from "../../components/common/Navbar";
import { useTranslation } from "react-i18next";

const Weather = () => {
  const { t } = useTranslation();
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({
    current: {
      temp: 32,
      condition: "sunny",
      humidity: 45,
      wind: 12,
      location: "Kallakurichi, Tamil Nadu",
    },
    forecast: [
      { day: "Thu", temp: 33, condition: "sunny" },
      { day: "Fri", temp: 31, condition: "partly_cloudy" },
      { day: "Sat", temp: 29, condition: "rain" },
      { day: "Sun", temp: 28, condition: "thunderstorm" },
      { day: "Mon", temp: 30, condition: "cloudy" },
    ],
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // In real app, fetch from OpenWeatherMap API
    console.log("Searching for weather in:", city);
  };

  return (
    <div className="bg-light min-vh-100">
      <Navbar />

      <div className="container py-5">
        <div className="row justify-content-center mb-5">
          <div className="col-md-8 text-center">
            <h2 className="fw-bold text-success mb-3">{t("weather.title")}</h2>
            <p className="text-muted">{t("weather.subtitle")}</p>

            <form
              onSubmit={handleSearch}
              className="d-flex gap-2 mt-4 shadow-sm p-2 bg-white rounded-pill"
            >
              <input
                type="text"
                className="form-control border-0 rounded-pill px-4"
                placeholder={t("weather.search_placeholder")}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-success rounded-pill px-4"
              >
                {t("weather.search")}
              </button>
            </form>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm bg-success text-white h-100">
              <div className="card-body p-4 text-center">
                <h5 className="mb-4">{weatherData.current.location}</h5>
                <i className="bi bi-sun-fill display-1 mb-3 d-block"></i>
                <h1 className="display-3 fw-bold mb-0">
                  {weatherData.current.temp}°C
                </h1>
                <p className="fs-5">
                  {t(`weather.conditions.${weatherData.current.condition}`)}
                </p>

                <hr className="bg-white my-4" />

                <div className="row">
                  <div className="col-6">
                    <small className="d-block opacity-75">
                      {t("weather.humidity")}
                    </small>
                    <span className="fw-bold">
                      {weatherData.current.humidity}%
                    </span>
                  </div>
                  <div className="col-6">
                    <small className="d-block opacity-75">
                      {t("weather.wind_speed")}
                    </small>
                    <span className="fw-bold">
                      {weatherData.current.wind} km/h
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-header bg-white py-3">
                <h5 className="mb-0 fw-bold">
                  {t("weather.five_day_forecast")}
                </h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between text-center overflow-auto pb-3">
                  {weatherData.forecast.map((f, i) => (
                    <div key={i} className="px-3 border-end last-border-0">
                      <p className="text-muted mb-2">{f.day}</p>
                      <i
                        className={`bi ${
                          f.condition === "rain"
                            ? "bi-cloud-rain"
                            : f.condition === "sunny"
                            ? "bi-sun"
                            : "bi-cloud"
                        } fs-2 text-success mb-2 d-block`}
                      ></i>
                      <h6 className="fw-bold mb-1">{f.temp}°C</h6>
                      <small className="text-muted">
                        {t(`weather.conditions.${f.condition}`)}
                      </small>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-light rounded border-start border-success border-4">
                  <h6 className="fw-bold">
                    <i className="bi bi-lightbulb-fill text-warning me-2"></i>
                    {t("weather.farming_advice")}
                  </h6>
                  <p className="small text-muted mb-0">
                    {t("weather.advice_desc")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .last-border-0:last-child {
          border-right: 0 !important;
        }
      `}</style>
    </div>
  );
};

export default Weather;
