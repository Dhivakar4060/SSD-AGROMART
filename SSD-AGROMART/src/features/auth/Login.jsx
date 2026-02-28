import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import authService from "../../services/authService";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authService.login(
        formData.email,
        formData.password
      );
      setAuth(response.data);
      navigate(`/${response.data.user.role.toLowerCase()}`);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
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
            <i className="bi bi-tree-fill text-success fs-1"></i>
            <h2 className="fw-bold mt-2">Welcome Back</h2>
            <p className="text-muted">Login to your Agromart account</p>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-3 position-relative">
              <label className="form-label">Email Address</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-0">
                  <i className="bi bi-envelope-fill text-success"></i>
                </span>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ fontSize: "14px" }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-3 position-relative">
              <label className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-0">
                  <i className="bi bi-lock-fill text-success"></i>
                </span>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{ fontSize: "14px" }}
                />
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-success text-decoration-none"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-success w-100 py-3 fw-bold"
              disabled={loading}
              style={{ fontSize: "16px" }}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="text-center mt-3">
            <p className="small mb-2">
              Don't have an account?{" "}
              <Link to="/register" className="text-success fw-bold">
                Sign Up here
              </Link>
            </p>
            <hr />
            <div className="d-flex justify-content-center gap-2 flex-wrap">
              <small className="text-muted me-1">Try:</small>
              <span
                className="badge bg-light text-dark cursor-pointer"
                onClick={() =>
                  setFormData({ email: "farmer@test.com", password: "123" })
                }
              >
                farmer@test.com
              </span>
              <span
                className="badge bg-light text-dark cursor-pointer"
                onClick={() =>
                  setFormData({ email: "admin@test.com", password: "123" })
                }
              >
                admin@test.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
