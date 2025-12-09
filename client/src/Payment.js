// client/src/Payment.js
import React from 'react';

const Payment = ({ setView, cart, clearCart }) => {
  const total = cart.reduce((a, c) => a + c.price * c.qty, 0) + 5; // Adding $5 delivery

  const handlePayment = (e) => {
    e.preventDefault();
    // Simulate a payment process
    alert("Payment Successful! Your food is on the way. 🚗💨");
    clearCart();      // 1. Empty the cart
    setView('home');  // 2. Go back to the home page
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2>Checkout</h2>
        <div className="order-summary">
          <p>Total Amount to Pay:</p>
          <h3>${total.toFixed(2)}</h3>
        </div>

        <form onSubmit={handlePayment}>
          <div className="form-group">
            <label>Card Number</label>
            <input type="text" placeholder="0000 0000 0000 0000" required />
          </div>
          <div className="row">
            <div className="form-group">
              <label>Expiry</label>
              <input type="text" placeholder="MM/YY" required />
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input type="password" placeholder="123" required />
            </div>
          </div>
          <button type="submit" className="pay-btn">Pay Now</button>
          <button type="button" className="cancel-btn" onClick={() => setView('cart')}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default Payment;