import React from 'react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const CustomerWishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div>
      <h3 className="fw-bold mb-4">My Wishlist</h3>
      
      {wishlistItems.length === 0 ? (
        <div className="card border-0 shadow-sm p-5 text-center">
          <i className="bi bi-heart display-1 text-muted mb-4"></i>
          <h3>Your wishlist is empty</h3>
          <p className="text-muted">Save items you like to buy them later.</p>
          <a href="/shop" className="btn btn-success px-4 mt-3">Browse Shop</a>
        </div>
      ) : (
        <div className="row g-4">
          {wishlistItems.map((item) => (
            <div className="col-md-4" key={item.id}>
              <div className="card h-100 border-0 shadow-sm">
                <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: '150px' }}>
                  <i className="bi bi-image text-muted fs-2"></i>
                </div>
                <div className="card-body">
                  <h6 className="fw-bold mb-1">{item.name}</h6>
                  <p className="text-muted small mb-3">₹{item.price} / {item.unit}</p>
                  <div className="d-flex gap-2">
                    <button 
                      className="btn btn-success btn-sm flex-grow-1"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </button>
                    <button 
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerWishlist;
