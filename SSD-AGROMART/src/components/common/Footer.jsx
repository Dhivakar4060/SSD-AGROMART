import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer bg-dark text-light pt-5 pb-3 mt-auto">

      <div className="container">

        <div className="row g-4">

          {/* Brand Section */}
          <div className="col-lg-4 col-md-6">

            <h4 className="fw-bold text-success mb-3">
              <i className="bi bi-flower1 me-2"></i>
              SSD AGROMART
            </h4>

            <p className="text-secondary small">
              Empowering farmers and consumers through smart agriculture
              technology. Transparent marketplace, fair pricing, and
              sustainable farming solutions.
            </p>

            {/* Social Icons */}
            <div className="d-flex gap-3 mt-3">

              <a href="#" className="footer-icon">
                <i className="bi bi-facebook"></i>
              </a>

              <a href="#" className="footer-icon">
                <i className="bi bi-twitter-x"></i>
              </a>

              <a href="#" className="footer-icon">
                <i className="bi bi-instagram"></i>
              </a>

              <a href="#" className="footer-icon">
                <i className="bi bi-linkedin"></i>
              </a>

            </div>

          </div>


          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">

            <h6 className="fw-bold mb-3 text-white">
              {t("footer.quick_links")}
            </h6>

            <ul className="list-unstyled footer-links">

              <li>
                <Link to="/shop">
                  {t("nav.shop")}
                </Link>
              </li>

              <li>
                <Link to="/bidding">
                  {t("nav.bidding")}
                </Link>
              </li>

              <li>
                <Link to="/weather">
                  {t("nav.weather")}
                </Link>
              </li>

              <li>
                <Link to="/chat">
                  {t("nav.chat")}
                </Link>
              </li>

            </ul>

          </div>


          {/* Support */}
          <div className="col-lg-3 col-md-6">

            <h6 className="fw-bold mb-3 text-white">
              {t("footer.support")}
            </h6>

            <ul className="list-unstyled footer-links">

              <li>
                <a href="#">
                  {t("footer.help_center")}
                </a>
              </li>

              <li>
                <a href="#">
                  {t("footer.terms")}
                </a>
              </li>

              <li>
                <a href="#">
                  {t("footer.privacy")}
                </a>
              </li>

              <li>
                <a href="#">
                  {t("footer.contact")}
                </a>
              </li>

            </ul>

          </div>


          {/* Newsletter */}
          <div className="col-lg-3 col-md-6">

            <h6 className="fw-bold mb-3 text-white">
              {t("footer.newsletter")}
            </h6>

            <p className="text-secondary small">
              {t("footer.newsletter_desc")}
            </p>

            <div className="input-group">

              <input
                type="email"
                className="form-control footer-input"
                placeholder={t("footer.email_placeholder")}
              />

              <button className="btn btn-success">
                {t("footer.join")}
              </button>

            </div>

          </div>

        </div>


        {/* Bottom Section */}
        <hr className="border-secondary mt-4" />

        <div className="text-center text-secondary small">

          <p className="mb-1">
            © 2026 SSD AGROMART. All Rights Reserved.
          </p>

          <p className="mb-0">
            Designed for Smart Agriculture 🌱
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;
