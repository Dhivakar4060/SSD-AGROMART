import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import "./App.css";

// Components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ProtectedRoute from "./components/common/ProtectedRoute";
import DashboardLayout from "./components/layout/DashboardLayout";

// Features
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import ForgotPassword from "./features/auth/ForgotPassword";
import ResetPassword from "./features/auth/ResetPassword";
import Shop from "./features/shop/Shop";
import ProductDetails from "./features/shop/ProductDetails";
import Cart from "./features/shop/Cart";
import BiddingList from "./features/bidding/BiddingList";
import Weather from "./features/weather/Weather";
import Chat from "./features/chat/Chat";
import AdminDashboard from "./features/dashboard/AdminDashboard";
import AdminUsers from "./features/dashboard/AdminUsers";
import FarmerDashboard from "./features/dashboard/FarmerDashboard";
import FarmerProducts from "./features/dashboard/FarmerProducts";
import MarketInsights from "./features/dashboard/MarketInsights";
import CropYieldCalculator from "./features/dashboard/CropYieldCalculator";
import FarmerOrders from "./features/dashboard/FarmerOrders";
import FarmerEarnings from "./features/dashboard/FarmerEarnings";
import CustomerDashboard from "./features/dashboard/CustomerDashboard";
import CustomerOrders from "./features/dashboard/CustomerOrders";
import CustomerWishlist from "./features/dashboard/CustomerWishlist";
import CustomerProfile from "./features/dashboard/CustomerProfile";

import { useTranslation } from "react-i18next";

// Placeholder pages
const Home = () => {
  const { t } = useTranslation();
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">
        {/* Hero Section */}
        <div className="bg-success bg-opacity-10 py-5">
          <div className="container py-5 text-center">
            <h1 className="display-3 fw-bold text-success mb-3">
              {t("hero_title")}
            </h1>
            <p className="lead text-muted mb-4 fs-4">{t("hero_subtitle")}</p>
            <div className="d-flex justify-content-center gap-3 mt-4">
              <a
                href="/login"
                className="btn btn-success btn-lg px-5 py-3 rounded-pill fw-bold shadow"
              >
                {t("get_started")}
              </a>
              <a
                href="/shop"
                className="btn btn-outline-success btn-lg px-5 py-3 rounded-pill fw-bold"
              >
                {t("browse_shop")}
              </a>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="container py-5">
          <div className="row g-4 text-center">
            <div className="col-md-3">
              <div className="p-4 rounded-4 bg-white shadow-sm border">
                <h2 className="fw-bold text-success mb-1">5000+</h2>
                <p className="text-muted mb-0">{t("home.active_farmers")}</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4 rounded-4 bg-white shadow-sm border">
                <h2 className="fw-bold text-success mb-1">10k+</h2>
                <p className="text-muted mb-0">{t("home.products_sold")}</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4 rounded-4 bg-white shadow-sm border">
                <h2 className="fw-bold text-success mb-1">200+</h2>
                <p className="text-muted mb-0">{t("home.live_auctions")}</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4 rounded-4 bg-white shadow-sm border">
                <h2 className="fw-bold text-success mb-1">50+</h2>
                <p className="text-muted mb-0">{t("home.cities_covered")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white py-5">
          <div className="container py-5">
            <div className="text-center mb-5">
              <h2 className="fw-bold display-5">{t("benefits.title")}</h2>
              <p className="text-muted lead">{t("benefits.subtitle")}</p>
            </div>
            <div className="row g-4">
              <div className="col-md-4 text-center">
                <div className="bg-success bg-opacity-10 p-4 rounded-circle d-inline-block mb-4">
                  <i className="bi bi-shield-check text-success display-5"></i>
                </div>
                <h4>{t("benefits.direct")}</h4>
                <p className="text-muted">{t("benefits.direct_desc")}</p>
              </div>
              <div className="col-md-4 text-center">
                <div className="bg-success bg-opacity-10 p-4 rounded-circle d-inline-block mb-4">
                  <i className="bi bi-hammer text-success display-5"></i>
                </div>
                <h4>{t("benefits.bidding")}</h4>
                <p className="text-muted">{t("benefits.bidding_desc")}</p>
              </div>
              <div className="col-md-4 text-center">
                <div className="bg-success bg-opacity-10 p-4 rounded-circle d-inline-block mb-4">
                  <i className="bi bi-cloud-sun text-success display-5"></i>
                </div>
                <h4>{t("benefits.agri")}</h4>
                <p className="text-muted">{t("benefits.agri_desc")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container py-5 mb-5">
          <div className="bg-dark text-white p-5 rounded-5 shadow-lg text-center position-relative overflow-hidden">
            <div className="position-relative z-1">
              <h2 className="display-5 fw-bold mb-4">{t("home.cta_title")}</h2>
              <p className="lead opacity-75 mb-4">{t("home.cta_subtitle")}</p>
              <a
                href="/register"
                className="btn btn-success btn-lg px-5 rounded-pill fw-bold"
              >
                {t("home.register_now")}
              </a>
            </div>
            <div className="position-absolute top-0 end-0 p-5 opacity-10">
              <i className="bi bi-tree-fill display-1"></i>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/bidding" element={<BiddingList />} />
      <Route path="/weather" element={<Weather />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      
      <Route
        path="/login"
        element={
          !user ? <Login /> : <Navigate to={`/${user.role.toLowerCase()}`} />
        }
      />
      <Route
        path="/register"
        element={
          !user ? <Register /> : <Navigate to={`/${user.role.toLowerCase()}`} />
        }
      />

      {/* Admin Protected Routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute roles={["ADMIN"]}>
            <DashboardLayout>
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/users" element={<AdminUsers />} />
                {/* Add more admin routes here */}
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Farmer Protected Routes */}
      <Route
        path="/farmer/*"
        element={
          <ProtectedRoute roles={["FARMER"]}>
            <DashboardLayout>
              <Routes>
                <Route path="/" element={<FarmerDashboard />} />
                <Route path="/products" element={<FarmerProducts />} />
                <Route path="/insights" element={<MarketInsights />} />
                <Route path="/calculator" element={<CropYieldCalculator />} />
                <Route path="/orders" element={<FarmerOrders />} />
                <Route path="/earnings" element={<FarmerEarnings />} />
                {/* Add more farmer routes here */}
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Customer Protected Routes */}
      <Route
        path="/customer/*"
        element={
          <ProtectedRoute roles={["CUSTOMER"]}>
            <DashboardLayout>
              <Routes>
                <Route path="/" element={<CustomerDashboard />} />
                <Route path="/orders" element={<CustomerOrders />} />
                <Route path="/wishlist" element={<CustomerWishlist />} />
                <Route path="/profile" element={<CustomerProfile />} />
                {/* Add more customer routes here */}
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
