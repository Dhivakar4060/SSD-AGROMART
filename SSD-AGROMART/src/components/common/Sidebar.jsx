import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();

  const farmerLinks = [
    { name: t("nav.home"), path: "/farmer", icon: "bi-grid" },
    {
      name: t("dashboard.my_products"),
      path: "/farmer/products",
      icon: "bi-basket",
    },
    {
      name: t("dashboard.market_insights"),
      path: "/farmer/insights",
      icon: "bi-graph-up",
    },
    {
      name: t("dashboard.yield_calculator"),
      path: "/farmer/calculator",
      icon: "bi-calculator",
    },
    { name: t("dashboard.live_bidding"), path: "/bidding", icon: "bi-hammer" },
    { name: t("dashboard.orders"), path: "/farmer/orders", icon: "bi-truck" },
    {
      name: t("dashboard.earnings"),
      path: "/farmer/earnings",
      icon: "bi-currency-dollar",
    },
  ];

  const adminLinks = [
    { name: "Admin Home", path: "/admin", icon: "bi-shield-lock" },
    { name: "Manage Users", path: "/admin/users", icon: "bi-people" },
    {
      name: "Product Approvals",
      path: "/admin/approvals",
      icon: "bi-check-circle",
    },
    { name: "System Logs", path: "/admin/logs", icon: "bi-journal-text" },
  ];

  const customerLinks = [
    { name: "My Orders", path: "/customer/orders", icon: "bi-bag-check" },
    { name: "Wishlist", path: "/customer/wishlist", icon: "bi-heart" },
    { name: "Profile", path: "/customer/profile", icon: "bi-person-vcard" },
  ];

  const links =
    user?.role === "ADMIN"
      ? adminLinks
      : user?.role === "FARMER"
      ? farmerLinks
      : customerLinks;

  return (
    <div
      className="bg-dark text-white p-3 vh-100 sticky-top "
      style={{ width: "250px" }}
    >
      <div className="mb-4 text-center">
        <div className=" rounded-circle d-inline-block p-2 mb-2 w-25 ">
          <i className="bi bi-person-fill fs-3"></i>
        </div>
        <h6 className="mb-0">{user?.name}</h6>
        <small className="text-muted">{user?.role}</small>
      </div>

      <ul className="nav flex-column gap-2">
        {links.map((link) => (
          <li className="nav-item" key={link.path}>
            <Link
              to={link.path}
              className={`nav-link text-white rounded d-flex align-items-center ${
                location.pathname === link.path
                  ? "bg-success active"
                  : "hover-bg-secondary"
              }`}
            >
              <i className={`bi ${link.icon} me-3 fs-5`}></i>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      <style>{`
        .hover-bg-secondary:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
