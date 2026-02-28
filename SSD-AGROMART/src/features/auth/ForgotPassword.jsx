import React, { useState } from "react";
import { Link } from "react-router-dom";
import authService from "../../services/authService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await authService.forgotPassword(email);
      const link = response.data;
      if (link) {
        setStatus({
          type: "success",
          message: `Reset link generated. Click to open: ${link}`,
        });
      } else {
        setStatus({
          type: "success",
          message: "If an account exists with this email, a reset link was generated.",
        });
      }
    } catch (error) {
      setStatus({
        type: "danger",
        message:
          error.response?.data?.message ||
          "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light d-flex flex-column min-vh-100">
      <div className="d-flex flex-grow-1 align-items-center justify-content-center w-100">
        <div
          className="card shadow-lg p-4 w-100"
          style={{ maxWidth: "420px", borderRadius: "12px" }}
        >
          <div className="text-center mb-4">
            <i className="bi bi-key-fill text-success fs-1"></i>
            <h2 className="fw-bold mt-2">Forgot Password?</h2>
            <p className="text-muted">
              Enter your email to receive a reset link
            </p>
          </div>

          {status.message && (
            <div className={`alert alert-${status.type} mb-4`} role="alert">
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4 position-relative">
              <label className="form-label fw-bold">Email Address</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-0">
                  <i className="bi bi-envelope-fill text-success"></i>
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ fontSize: "14px" }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-success w-100 py-3 fw-bold mb-3"
              disabled={loading}
              style={{ fontSize: "16px" }}
            >
              {loading ? "Generating..." : "Generate Reset Link"}
            </button>

            <div className="text-center">
              <Link to="/login" className="text-success text-decoration-none">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
