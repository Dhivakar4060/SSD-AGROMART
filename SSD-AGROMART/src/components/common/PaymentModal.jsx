import React, { useState } from 'react';

const PaymentModal = ({ show, onHide, onConfirm, amount }) => {
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!show) return null;

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment gateway delay
    setTimeout(() => {
      setIsProcessing(false);
      onConfirm();
    }, 2000);
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header bg-success text-white">
            <h5 className="modal-title fw-bold">Secure Checkout</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onHide}></button>
          </div>
          <div className="modal-body p-4">
            <div className="text-center mb-4">
              <h6 className="text-muted text-uppercase small fw-bold">Amount to Pay</h6>
              <h2 className="display-6 fw-bold text-dark">₹{amount}</h2>
            </div>

            <div className="mb-4">
              <label className="form-label small fw-bold text-muted text-uppercase">Select Payment Method</label>
              <div className="d-flex flex-column gap-2">
                <button 
                  className={`btn text-start p-3 border-2 ${paymentMethod === 'UPI' ? 'btn-outline-success bg-success bg-opacity-10 border-success' : 'btn-outline-light text-dark'}`}
                  onClick={() => setPaymentMethod('UPI')}
                >
                  <div className="d-flex align-items-center">
                    <i className="bi bi-qr-code-scan fs-4 me-3"></i>
                    <div>
                      <div className="fw-bold">UPI / QR Code</div>
                      <small className="text-muted">Pay using any UPI App</small>
                    </div>
                  </div>
                </button>
                <button 
                  className={`btn text-start p-3 border-2 ${paymentMethod === 'CARD' ? 'btn-outline-success bg-success bg-opacity-10 border-success' : 'btn-outline-light text-dark'}`}
                  onClick={() => setPaymentMethod('CARD')}
                >
                  <div className="d-flex align-items-center">
                    <i className="bi bi-credit-card fs-4 me-3"></i>
                    <div>
                      <div className="fw-bold">Credit / Debit Card</div>
                      <small className="text-muted">All major cards accepted</small>
                    </div>
                  </div>
                </button>
                <button 
                  className={`btn text-start p-3 border-2 ${paymentMethod === 'COD' ? 'btn-outline-success bg-success bg-opacity-10 border-success' : 'btn-outline-light text-dark'}`}
                  onClick={() => setPaymentMethod('COD')}
                >
                  <div className="d-flex align-items-center">
                    <i className="bi bi-cash-stack fs-4 me-3"></i>
                    <div>
                      <div className="fw-bold">Cash on Delivery</div>
                      <small className="text-muted">Pay when you receive</small>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div className="bg-light p-3 rounded-3 mb-4">
              <div className="d-flex align-items-center text-success small">
                <i className="bi bi-shield-lock-fill me-2"></i>
                <span>Your payment information is encrypted and secure.</span>
              </div>
            </div>

            <button 
              className="btn btn-success btn-lg w-100 py-3 rounded-3 fw-bold shadow-sm"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Processing...
                </>
              ) : (
                `Pay ₹${amount}`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
