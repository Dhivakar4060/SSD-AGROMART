import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../services/authService";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "CUSTOMER",
    phone: "",
    location: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone,
        location: formData.location,
      });

      navigate("/login", {
        state: { message: "Registration successful! Please login." },
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light p-3">
      <div
        className="card shadow-lg p-4 border-0 w-100"
        style={{ maxWidth: "550px", borderRadius: "15px" }}
      >
        <div className="text-center mb-4">
          <div className=" d-inline-block p-3 rounded-circle mb-3 w-25">
            <i className="bi bi-person-plus-fill text-success fs-1"></i>
          </div>
          <h2 className="fw-bold">Create Account</h2>
          <p className="text-muted">Join the SSD Agromart community</p>
        </div>

        {error && <div className="alert alert-danger rounded-3">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-3 position-relative">
            <label className="form-label fw-bold">Full Name</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-0">
                <i className="bi bi-person-fill text-success"></i>
              </span>
              <input
                type="text"
                name="name"
                className="form-control form-control-lg bg-light border-0"
                placeholder="Enter your name"
                onChange={handleChange}
                value={formData.name}
                required
                style={{ fontSize: "14px" }}
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-3 position-relative">
            <label className="form-label fw-bold">Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-0">
                <i className="bi bi-envelope-fill text-success"></i>
              </span>
              <input
                type="email"
                name="email"
                className="form-control form-control-lg bg-light border-0"
                placeholder="name@example.com"
                onChange={handleChange}
                value={formData.email}
                required
                style={{ fontSize: "14px" }}
              />
            </div>
          </div>

          <div className="row">
            {/* Password */}
            <div className="col-md-6 mb-3 position-relative">
              <label className="form-label fw-bold">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-0">
                  <i className="bi bi-lock-fill text-success"></i>
                </span>
                <input
                  type="password"
                  name="password"
                  className="form-control form-control-lg bg-light border-0"
                  placeholder="••••••"
                  onChange={handleChange}
                  value={formData.password}
                  required
                  minLength="6"
                  style={{ fontSize: "14px" }}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="col-md-6 mb-3 position-relative">
              <label className="form-label fw-bold">Confirm Password</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-0">
                  <i className="bi bi-lock-fill text-success"></i>
                </span>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control form-control-lg bg-light border-0"
                  placeholder="••••••"
                  onChange={handleChange}
                  value={formData.confirmPassword}
                  required
                  style={{ fontSize: "14px" }}
                />
              </div>
            </div>
          </div>

          {/* Role */}
          <div className="mb-3 position-relative">
            <label className="form-label fw-bold">Select Your Role</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-0">
                <i className="bi bi-person-badge-fill text-success"></i>
              </span>
              <select
                name="role"
                className="form-select form-select-lg bg-light border-0"
                value={formData.role}
                onChange={handleChange}
                style={{ fontSize: "14px" }}
              >
                <option value="CUSTOMER">Buyer</option>
                <option value="FARMER">Seller</option>
                <option value="ADMIN">Administrator</option>
              </select>
            </div>
          </div>

          <div className="row">
            {/* Phone */}
            <div className="col-md-6 mb-3 position-relative">
              <label className="form-label fw-bold">Phone Number</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-0">
                  <i className="bi bi-telephone-fill text-success"></i>
                </span>
                <input
                  type="text"
                  name="phone"
                  className="form-control form-control-lg bg-light border-0"
                  placeholder="+91..."
                  onChange={handleChange}
                  value={formData.phone}
                  style={{ fontSize: "14px" }}
                />
              </div>
            </div>

            {/* Location */}
            <div className="col-md-6 mb-4 position-relative">
              <label className="form-label fw-bold">Location</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-0">
                  <i className="bi bi-geo-alt-fill text-success"></i>
                </span>
                <input
                  type="text"
                  name="location"
                  className="form-control form-control-lg bg-light border-0"
                  placeholder="City, State"
                  onChange={handleChange}
                  value={formData.location}
                  style={{ fontSize: "14px" }}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-success btn-lg w-100 py-2 rounded-pill fw-bold shadow-sm"
            disabled={loading}
            style={{fontSize:"18px"}}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>

          <div className="text-center mt-4">
            <p className="text-muted small">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-success fw-bold text-decoration-none"
              >
                Sign In here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
