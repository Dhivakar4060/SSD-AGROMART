import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";
import "../../styles/Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const { t } = useTranslation();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-primary bg-success shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold text-white" to="/">
          SSD AGROMART
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/shop">
                {t("nav.shop")}
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/bidding">
                {t("nav.bidding")}
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/weather">
                {t("nav.weather")}
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/chat">
                {t("nav.chat")}
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">

           

            {/* Theme Toggle */}
            <li className="nav-item me-2 list-unstyled">
              <button
                className="btn btn-link nav-link text-white p-2"
                onClick={toggleTheme}
                title={
                  isDarkMode ? t("nav.switch_light") : t("nav.switch_dark")
                }
              >
                <i className={`bi bi-${isDarkMode ? "sun" : "moon-stars"}`}></i>
              </button>
            </li>

            {/* Cart */}
            <Link
              to="/cart"
              className="  border-light rounded-circle position-relative text-white p-2 me-3"
            >
              <i className="bi bi-cart3 fs-5"></i>

              {cartItems.length > 0 && (
                <span className="position-absolute top-2 start-100 translate-middle badge rounded-pill bg-danger border border-light p-1">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="dropdown">
                <button
                  className="btn btn-light rounded-pill px-3 dropdown-toggle shadow-sm d-flex align-items-center"
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-person-circle me-2"></i>
                  {user.name}
                </button>

                <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">

                  <li>
                    <Link
                      className="dropdown-item"
                      to={`/${user.role.toLowerCase()}`}
                    >
                      <i className="bi bi-speedometer2 me-2"></i>
                      {t("nav.dashboard")}
                    </Link>
                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <button
                      className="dropdown-item"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      {t("nav.logout")}
                    </button>
                  </li>

                </ul>
              </div>
            ) : (
              <div className="d-flex gap-2">

                <Link
                  className="btn btn-outline-light rounded-pill px-4"
                  to="/login"
                >  
                  {t("nav.login")}
                </Link>

                <Link
                  className="btn btn-light rounded-pill px-4"
                  to="/register"
                >
                  {t("nav.register")}
                </Link>

              </div>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
