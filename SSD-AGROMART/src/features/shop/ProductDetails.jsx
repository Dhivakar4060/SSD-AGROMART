import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import productService from "../../services/productService";
import { useCart } from "../../context/CartContext";
import Navbar from "../../components/common/Navbar";
import { useTranslation } from "react-i18next";

const ProductDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await productService.getProductById(id);
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="text-center py-5 h-100 w-full ">
        {t("common.loading") || "Loading..."}
      </div>
    );
  if (!product)
    return <div className="text-center py-5">{t("product.not_found")}</div>;

  return (
    <div className="bg-light min-vh-100">
      <Navbar />
      <div className="container py-5">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/shop">{t("nav.shop") || "Shop"}</Link>
            </li>
            <li className="breadcrumb-item active ">{product.name}</li>
          </ol>
        </nav>

        <div className="row g-5">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm overflow-hidden">
              <div
                className="bg-secondary bg-opacity-10 d-flex align-items-center justify-content-center"
                style={{ height: "400px" }}
              >
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-100 w-100 object-fit-cover"
                  />
                ) : (
                  <i className="bi bi-image text-muted display-1"></i>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="ps-md-4">
              <span className="badge bg-success bg-opacity-10 text-success mb-2">
                {t(`shop.categories.${product.category.toLowerCase()}`)}
              </span>
              <h1 className="fw-bold mb-3">{product.name}</h1>

              <div className="d-flex align-items-center mb-4">
                <div className="text-warning me-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className={`bi ${
                        star <= Math.round(product.rating)
                          ? "bi-star-fill p-1"
                          : "bi-star p-1"
                      }`}
                    ></i>
                  ))}
                </div>
                <span className="text-muted">
                  ({product.reviews.length} {t("product.customer_reviews")})
                </span>
              </div>

              <h2 className="text-success fw-bold mb-4 ">
                ₹{product.price}{" "}
                <small className="text-muted fw-normal fs-6">
                  / {product.unit}
                </small>
              </h2>

              <p className="text-muted mb-4 lead">{product.description}</p>

              <div className="bg-white p-4 rounded-3 shadow-sm mb-4">
                <div className="row text-center">
                  <div className="col-6 border-end">
                    <small className="text-muted d-block mb-1">
                      {t("product.stock_status")}
                    </small>
                    <span
                      className={`fw-bold ${
                        product.stock > 0 ? "text-success" : "text-danger"
                      }`}
                    >
                      {product.stock > 0
                        ? `${product.stock} ${product.unit} ${t(
                            "product.available"
                          )}`
                        : t("shop.out_of_stock")}
                    </span>
                  </div>
                  <div className="col-6">
                    <small className="text-muted d-block mb-1">
                      {t("product.farmer")}
                    </small>
                    <span className="fw-bold">{product.farmer}</span>
                    <br />
                    <small className="text-muted">
                      <i className="bi bi-geo-alt me-1"></i>
                      {product.location}
                    </small>
                  </div>
                </div>
              </div>

              <div className="d-grid gap-2">
                <button
                  className="btn btn-success btn-lg py-2 mb-2"
                  onClick={() => addToCart(product)}
                  disabled={product.stock <= 0}
                  
                >
                  <i className="bi bi-cart-plus me-2 "></i>{" "}
                  {t("shop.add_to_cart")}
                </button>
                <button className="btn btn-outline-success btn-lg py-2" >
                  <i className="bi bi-chat-dots me-2"></i>{" "}
                  {t("product.contact_farmer")}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-5">
          <ul className="nav nav-tabs mb-4" id="productTab" role="tablist">
            <li className="nav-item">
              <button
                className="nav-link active fw-bold"
                data-bs-toggle="tab"
                data-bs-target="#reviews"
              >
                {t("product.reviews")} ({product.reviews.length})
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link fw-bold"
                data-bs-toggle="tab"
                data-bs-target="#shipping"
              >
                {t("product.shipping_info")}
              </button>
            </li>
          </ul>

          <div className="tab-content bg-white p-4 rounded-3 shadow-sm">
            <div className="tab-pane fade show active" id="reviews">
              <div className="row g-4">
                {product.reviews.map((review) => (
                  <div className="col-12 border-bottom pb-4" key={review.id}>
                    <div className="d-flex justify-content-between mb-2">
                      <h6 className="fw-bold mb-0 ">{review.user}</h6>
                      <small className="text-muted">{review.date}</small>
                    </div>
                    <div className="text-warning mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i
                          key={star}
                          className={`bi ${
                            star <= review.rating ? "bi-star-fill p-1" : "bi-star p-1"
                          } small`}
                        ></i>
                      ))}
                    </div>
                    <p className="text-muted mb-0 ">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="tab-pane fade" id="shipping">
              <p className="text-muted mb-0">{t("product.shipping_desc")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
