import React, { useState, useEffect } from "react";
import productService from "../../services/productService";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

const FarmerProducts = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "Vegetables",
    unit: "kg",
    description: "",
    image: null,
    preview: null,
  });

  useEffect(() => {
    loadProducts();
  }, [user]);

  const loadProducts = async () => {
    if (user && user.id) {
      try {
        const data = await productService.getFarmerProducts(user.id);
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    }
  };

  // Pagination
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.id) return alert("User not logged in!");

    const errors = {};
    if (!formData.name?.trim()) errors.name = "Name is required";
    if (formData.price === "" || Number(formData.price) <= 0)
      errors.price = "Price must be greater than 0";
    if (formData.stock === "" || Number(formData.stock) < 0)
      errors.stock = "Stock cannot be negative";
    if (!formData.unit) errors.unit = "Unit is required";
    if (!formData.category) errors.category = "Category is required";
    setFormErrors(errors);
    if (Object.keys(errors).length) return;

    try {
      setSaving(true);
      const productPayload = {
        name: formData.name.trim(),
        price: Number(formData.price),
        stock: Number(formData.stock),
        category: formData.category,
        unit: formData.unit,
        description: (formData.description || "").trim(),
        // include image file if one was selected so the service can build
        // a FormData object with it.  the service will ignore a null value.
        image: formData.image || null,
      };

      if (editingProduct) {
        await productService.updateProduct(editingProduct.id, productPayload);
      } else {
        await productService.addProduct(productPayload, user.id);
      }

      // Reset form
      setFormData({
        name: "",
        price: "",
        stock: "",
        category: "Vegetables",
        unit: "kg",
        description: "",
        image: null,
        preview: null,
      });
      setEditingProduct(null);
      setShowModal(false);
      loadProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      const msg =
        error.response?.data?.message ||
        "Failed to save product. Check console for details.";
      alert(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category,
      unit: product.unit,
      description: product.description || "",
      image: null,
      preview: product.imageUrl || null,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        t("dashboard.confirm_delete_product") ||
          "Are you sure you want to delete this product?"
      )
    ) {
      try {
        await productService.deleteProduct(id);
        loadProducts();
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0">
          {t("dashboard.my_products") || "My Products"}
        </h3>
        <div className="d-flex gap-3 align-items-center">
          <input
            type="text"
            className="form-control form-control-sm rounded-pill px-3"
            placeholder={
              t("dashboard.search_placeholder") || "Search products..."
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="btn btn-success btn-sm rounded-pill px-3 w-75"
            onClick={() => {
              setEditingProduct(null);
              setFormData({
                name: "",
                price: "",
                stock: "",
                category: "Vegetables",
                unit: "kg",
                description: "",
                image: null,
                preview: null,
              });
              setFormErrors({});
              setShowModal(true);
            }}
          >
            <i className="bi bi-plus-lg me-1"></i>{" "}
            {t("dashboard.add_new") || "Add New"}
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="bg-light">
              <tr>
                <th className="px-4">{t("dashboard.product") || "Product"}</th>
                <th>{t("dashboard.category") || "Category"}</th>
                <th>{t("dashboard.price") || "Price"}</th>
                <th>{t("dashboard.stock") || "Stock"}</th>
                <th>{t("dashboard.status") || "Status"}</th>
                <th className="text-end px-4">
                  {t("dashboard.actions") || "Actions"}
                </th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.length ? (
                currentProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 d-flex align-items-center">
                      <div
                        className="bg-light rounded p-2 me-3"
                        style={{
                          width: 40,
                          height: 40,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="img-fluid rounded"
                          />
                        ) : (
                          <i className="bi bi-box-seam text-secondary"></i>
                        )}
                      </div>
                      <div className="fw-bold text-dark">{product.name}</div>
                    </td>
                    <td>
                      <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3">
                        {product.category}
                      </span>
                    </td>
                    <td className="fw-bold">
                      ₹{product.price} / {product.unit}
                    </td>
                    <td>
                      {product.stock} {product.unit}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          product.stock > 0 ? "bg-success" : "bg-danger"
                        } rounded-pill`}
                      >
                        {product.stock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="text-end px-4">
                      <button
                        className="btn btn-light btn-sm me-2"
                        style={{ fontSize: 20 }}
                        onClick={() => handleEdit(product)}
                      >
                        <i className="bi bi-pencil-square text-primary"></i>
                      </button>
                      <button
                        className="btn btn-light btn-sm rounded-circle"
                        style={{ fontSize: 20 }}
                        onClick={() => handleDelete(product.id)}
                      >
                        <i className="bi bi-trash text-danger"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-muted">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                &laquo;
              </button>
            </li>
            {[...Array(totalPages)].map((_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      )}

      {/* Modal */}
      {showModal && (
        <div
          className="modal show d-block w-100"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">
                  {editingProduct
                    ? t("dashboard.edit_product") || "Edit Product"
                    : t("dashboard.add_new_product") || "Add New Product"}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="modal-body">
                  {/* Name */}
                  <div className="mb-3">
                    <label className="form-label">
                      {t("dashboard.product_name") || "Product Name"}
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    {formErrors.name && (
                      <small className="text-danger">{formErrors.name}</small>
                    )}
                  </div>

                  {/* Image */}
                  <div className="mb-3">
                    <label className="form-label">
                      {t("dashboard.product_image") || "Product Image"}
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    {formData.preview && (
                      <img
                        src={formData.preview}
                        alt="Preview"
                        className="img-fluid mt-2 rounded"
                        style={{ maxHeight: 150 }}
                      />
                    )}
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        {t("dashboard.price") || "Price"} (₹)
                      </label>
                      <input
                        type="number"
                        name="price"
                        className="form-control"
                        value={formData.price}
                        onChange={handleInputChange}
                        min="0"
                        step="0.01"
                        required
                      />
                      {formErrors.price && (
                        <small className="text-danger">
                          {formErrors.price}
                        </small>
                      )}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        {t("dashboard.unit") || "Unit"}
                      </label>
                      <select
                        name="unit"
                        className="form-select"
                        value={formData.unit}
                        onChange={handleInputChange}
                      >
                        <option value="kg">Per kg</option>
                        <option value="piece">Per Piece</option>
                        <option value="quintal">Per Quintal</option>
                        <option value="liter">Per Liter</option>
                      </select>
                      {formErrors.unit && (
                        <small className="text-danger">{formErrors.unit}</small>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        {t("dashboard.stock_quantity") || "Stock Quantity"}
                      </label>
                      <input
                        type="number"
                        name="stock"
                        className="form-control"
                        value={formData.stock}
                        onChange={handleInputChange}
                        min="0"
                        required
                      />
                      {formErrors.stock && (
                        <small className="text-danger">
                          {formErrors.stock}
                        </small>
                      )}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        {t("dashboard.category") || "Category"}
                      </label>
                      <select
                        name="category"
                        className="form-select"
                        value={formData.category}
                        onChange={handleInputChange}
                      >
                        <option value="Vegetables">Vegetables</option>
                        <option value="Grains">Grains</option>
                        <option value="Fruits">Fruits</option>
                        <option value="Dairy">Dairy</option>
                        <option value="Spices">Spices</option>
                      </select>
                      {formErrors.category && (
                        <small className="text-danger">
                          {formErrors.category}
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="mb-0">
                    <label className="form-label">
                      {t("dashboard.description") || "Description"}
                    </label>
                    <textarea
                      name="description"
                      className="form-control"
                      rows="3"
                      value={formData.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>

                <div className="modal-footer border-0">
                  <button
                    type="button"
                    className="btn btn-light rounded-pill px-4"
                    onClick={() => setShowModal(false)}
                  >
                    {t("dashboard.cancel") || "Cancel"}
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success rounded-pill px-4"
                    disabled={saving}
                  >
                    {editingProduct
                      ? t("dashboard.save_changes") || "Save Changes"
                      : t("dashboard.add_product") || "Add Product"}
                    {saving && (
                      <span className="spinner-border spinner-border-sm ms-2" />
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerProducts;
