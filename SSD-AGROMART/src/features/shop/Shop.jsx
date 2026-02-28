import React, { useState, useEffect } from "react";
import productService from "../../services/productService";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Shop = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(5000);
  const [sortOrder, setSortOrder] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, selectedCategory, priceRange, products, sortOrder, inStockOnly]);

  const loadProducts = async () => {
    const data = await productService.getAllProducts();
    setProducts(data);
    setFilteredProducts(data);
    setLoading(false);
  };

  const filterProducts = () => {
    let result = [...products];

    // Search
    if (searchTerm) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price
    result = result.filter((p) => p.price <= priceRange);

    // Stock filter
    if (inStockOnly) result = result.filter((p) => p.stock > 0);

    // Sort
    if (sortOrder === "low-high") result.sort((a, b) => a.price - b.price);
    if (sortOrder === "high-low") result.sort((a, b) => b.price - a.price);

    setFilteredProducts(result);
  };

  const categories = ["All", "Vegetables", "Grains", "Fruits", "Dairy", "Spices"];

  if (loading)
    return <div className="text-center py-5">{t("common.loading") || "Loading..."}</div>;

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Navbar />

      <div className="container-fluid py-4 flex-grow-1">
        <div className="row g-4">
          {/* Filters Sidebar */}
          <div className="col-lg-3">
            <div className="card border-0 shadow-sm p-4 sticky-top" style={{ top: "100px" }}>
              <h5 className="fw-bold mb-4">{t("shop.filters")}</h5>

              {/* Search */}
              <div className="mb-4">
                <label className="form-label fw-bold small text-muted text-uppercase">
                  {t("shop.search")}
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control bg-light border-0"
                    placeholder={t("shop.search_placeholder")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Category */}
              <div className="mb-4">
                <label className="form-label fw-bold small text-muted text-uppercase">
                  {t("shop.category")}
                </label>
                <div className="d-flex flex-column gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className={`btn btn-sm text-start px-3 py-2 rounded-3 ${
                        selectedCategory === cat
                          ? "btn-success shadow-sm"
                          : "btn-outline-light text-dark border-0 bg-light bg-opacity-50"
                      }`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {t(`shop.categories.${cat.toLowerCase()}`)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-4">
                <label className="form-label fw-bold small text-muted text-uppercase">
                  {t("shop.max_price")}: ₹{priceRange}
                </label>
                <input
                  type="range"
                  className="form-range custom-range"
                  min="0"
                  max="5000"
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                />
                <div className="d-flex justify-content-between small text-muted mt-1">
                  <span>₹0</span>
                  <span>₹5000</span>
                </div>
              </div>

              {/* Stock */}
              <div className="mb-4 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="inStockOnly"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                />
                <label className="form-check-label small text-muted" htmlFor="inStockOnly">
                  {t("Avaliable Only")}
                </label>
              </div>

              {/* Sort */}
              <div className="mb-4">
                <label className="form-label fw-bold small text-muted text-uppercase">
                  {t("Price Sort")}
                </label>
                <select
                  className="form-select form-select-sm"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="">{t("Default")}</option>
                  <option value="low-high">{t("Low To High")}</option>
                  <option value="high-low">{t("High To Low")}</option>
                </select>
              </div>

              {/* Reset */}
              <button
                className="btn btn-outline-success btn-sm w-100 rounded-3 mt-2"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setPriceRange(5000);
                  setSortOrder("");
                  setInStockOnly(false);
                }}
              >
                {t("shop.reset_filters")}
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
              <h4 className="fw-bold mb-0">
                {selectedCategory === "All"
                  ? t("shop.all_products")
                  : t(`shop.categories.${selectedCategory.toLowerCase()}`)}
                <span className="text-muted fw-normal ms-2 small">
                  ({filteredProducts.length} {t("shop.items")})
                </span>
              </h4>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-5 bg-white rounded-4 shadow-sm">
                <i className="bi bi-search display-1 text-muted opacity-25 mb-3"></i>
                <h3>{t("shop.no_products_found")}</h3>
                <p className="text-muted">{t("shop.adjust_filters")}</p>
              </div>
            ) : (
              <div className="row g-4">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="col-md-4 col-sm-6">
                    <div className="card h-100 border-0 shadow-sm product-card transition-up">
                      <div className="position-relative">
                        <div
                          className="bg-light d-flex align-items-center justify-content-center overflow-hidden"
                          style={{ height: "200px" }}
                        >
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              className="card-img-top h-100 w-100 object-fit-cover"
                              alt={product.name}
                            />
                          ) : (
                            <i className="bi bi-image text-muted display-6"></i>
                          )}
                        </div>
                        <div className="position-absolute top-0 end-0 p-2">
                          <button
                            className={`btn btn-white shadow-sm rounded-circle p-2 ${
                              isInWishlist(product.id) ? "text-danger" : "text-muted"
                            }`}
                            onClick={() =>
                              isInWishlist(product.id)
                                ? removeFromWishlist(product.id)
                                : addToWishlist(product)
                            }
                          >
                            <i
                              className={`bi ${
                                isInWishlist(product.id) ? "bi-heart-fill" : "bi-heart"
                              }`}
                            ></i>
                          </button>
                        </div>
                      </div>
                      <div className="card-body p-3">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="fw-bold mb-0 text-dark">{product.name}</h6>
                          <span className="badge bg-success bg-opacity-10 text-success small">
                            {t(`shop.categories.${product.category.toLowerCase()}`)}
                          </span>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                          <h5 className="fw-bold text-success mb-0">₹{product.price}</h5>
                          <span className="text-muted small ms-1">/ {product.unit}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <span
                            className={`small ${
                              product.stock > 0 ? "text-success" : "text-danger"
                            }`}
                          >
                            {product.stock > 0 ? t("shop.in_stock") : t("shop.out_of_stock")}
                          </span>
                          <button
                            className="btn btn-success btn-sm rounded-pill px-3"
                            onClick={() => addToCart(product)}
                            disabled={product.stock === 0}
                          >
                            <i className="bi bi-cart-plus me-1"></i> {t("shop.add_to_cart")}
                          </button>
                        </div>
                        <Link to={`/product/${product.id}`} className="stretched-link"></Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />

      {/* Inline Styles */}
      <style>{`
        .product-card { transition: transform 0.2s; }
        .product-card:hover { transform: translateY(-5px); }
        .btn-white { background: white; border: none; }
        .btn-white:hover { background: #f8f9fa; }
      `}</style>
    </div>
  );
};

export default Shop;
