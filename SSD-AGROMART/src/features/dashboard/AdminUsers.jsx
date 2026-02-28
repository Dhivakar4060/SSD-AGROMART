import React, { useState, useEffect } from "react";
import adminService from "../../services/adminService";
import { useTranslation } from "react-i18next";

const AdminUsers = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh@farm.com",
      role: "FARMER",
      verified: true,
      rating: 4.8,
      joins: "2026-01-15",
    },
    {
      id: 2,
      name: "Anita Sharma",
      email: "anita@test.com",
      role: "CUSTOMER",
      verified: true,
      rating: 5.0,
      joins: "2026-02-01",
    },
    {
      id: 3,
      name: "Suresh Patel",
      email: "suresh@farm.com",
      role: "FARMER",
      verified: false,
      rating: 0,
      joins: "2026-02-20",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  const toggleVerify = (id) => {
    setUsers(
      users.map((u) => (u.id === id ? { ...u, verified: !u.verified } : u))
    );
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "ALL" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role) => {
    return role === "FARMER" ? "bg-success" : "bg-info";
  };

  return (
    <div className="pb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0">
          {t("admin.user_management") || "User Management"}
        </h3>
        <div className="d-flex gap-2 p-1 rounded-pill bg-light">
          <select
            className="form-select form-select-sm rounded-pill px-3 border-1 shadow-sm"
            style={{ width: "150px" }}
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="ALL">{t("admin.all_roles") || "All Roles"}</option>
            <option value="FARMER">
              {t("admin.role_farmer") || "Farmers"}
            </option>
            <option value="CUSTOMER">
              {t("admin.role_customer") || "Customers"}
            </option>
          </select>
          <input
            type="text"
            className="form-control form-control-sm rounded-pill px-3"
            placeholder={
              t("admin.search_users_placeholder") || "Search users..."
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-success btn-sm rounded-pill px-3 w-50 text-start">
            <i className="bi bi-plus-lg me-1"></i> {t("admin.add_user") || "Add User"}
          </button>
        </div>
      </div>

      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="bg-light">
              <tr>
                <th className="px-4">{t("admin.user") || "User"}</th>
                <th>{t("admin.role") || "Role"}</th>
                <th>{t("admin.status") || "Status"}</th>
                <th>{t("admin.rating") || "Rating"}</th>
                <th>{t("admin.joined") || "Joined"}</th>
                <th className="text-end px-4">
                  {t("admin.actions") || "Actions"}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-4">
                    <div className="d-flex align-items-center">
                      <div
                        className="bg-light rounded-circle p-2 me-3"
                        style={{
                          width: "40px",
                          height: "40px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <i className="bi bi-person text-secondary"></i>
                      </div>
                      <div>
                        <div className="fw-bold text-dark">{user.name}</div>
                        <div className="text-muted small">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge ${getRoleBadge(
                        user.role
                      )} rounded-pill`}
                    >
                      {t(`admin.role_${user.role.toLowerCase()}`) || user.role}
                    </span>
                  </td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={user.verified}
                        onChange={() => toggleVerify(user.id)}
                      />
                      <span
                        className={`small ${
                          user.verified ? "text-success" : "text-danger"
                        }`}
                      >
                        {user.verified
                          ? t("admin.verified") || "Verified"
                          : t("admin.unverified") || "Unverified"}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="text-warning">
                      <i className="bi bi-star-fill me-1"></i>
                      <span className="text-dark fw-bold">{user.rating}</span>
                    </div>
                  </td>
                  <td className="text-muted small">{user.joins}</td>
                  <td className="text-end px-4">
                    <button className="btn btn-light btn-sm rounded-circle me-2">
                      <i className="bi bi-pencil-square text-primary"></i>
                    </button>
                    <button className="btn btn-light btn-sm rounded-circle">
                      <i className="bi bi-trash text-danger"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-muted">
                    {t("admin.no_users_found") ||
                      "No users found matching your filters."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
