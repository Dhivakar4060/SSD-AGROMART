import React, { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import authService from "../../services/authService";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [passwords, setPasswords] = useState({ password: "", confirm: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.password !== passwords.confirm) {
      setStatus({ type: "danger", message: "Passwords do not match" });
      return;
    }

    setLoading(true);
    setStatus({ type: "", message: "" });
    try {
      await authService.resetPassword(token, passwords.password);
      setStatus({
        type: "success",
        message: "Password has been reset successfully!",
      });
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setStatus({
        type: "danger",
        message:
          error.response?.data?.message ||
          "Invalid or expired token. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger d-inline-block">
          Invalid request. Missing reset token.
        </div>
        <br />
        <Link to="/login" className="btn btn-success mt-3">
          Back to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-light d-flex flex-column min-vh-100">
      <div className="d-flex flex-grow-1 align-items-center justify-content-center w-100">
        <div
          className="card shadow-lg p-4 w-100"
          style={{ maxWidth: "420px", borderRadius: "12px" }}
        >
          <div className="text-center mb-4">
            <i className="bi bi-lock-fill text-success fs-1"></i>
            <h2 className="fw-bold mt-2">Reset Password</h2>
            <p className="text-muted">Enter your new secure password</p>
          </div>

          {status.message && (
            <div className={`alert alert-${status.type} mb-4`} role="alert">
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3 input-group">
              <span className="input-group-text bg-light border-0">
                <i className="bi bi-lock-fill text-success"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="New Password"
                required
                minLength="6"
                value={passwords.password}
                onChange={(e) =>
                  setPasswords({ ...passwords, password: e.target.value })
                }
                style={{ fontSize: "14px" }}
              />
            </div>

            <div className="mb-4 input-group">
              <span className="input-group-text bg-light border-0">
                <i className="bi bi-lock-fill text-success"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm New Password"
                required
                value={passwords.confirm}
                onChange={(e) =>
                  setPasswords({ ...passwords, confirm: e.target.value })
                }
                style={{ fontSize: "14px" }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-100 py-3 fw-bold"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <div className="text-center mt-3">
            <Link to="/login" className="text-success text-decoration-none">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
