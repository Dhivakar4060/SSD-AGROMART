import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import "./i18n";
import App from "./App.jsx";
import ErrorBoundary from "./components/common/ErrorBoundary";

// Providers
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ThemeProvider } from "./context/ThemeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <ErrorBoundary>
                <App />
              </ErrorBoundary>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
