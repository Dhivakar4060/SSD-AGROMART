import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    // Redirect to unauthorized or home if role doesn't match
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
