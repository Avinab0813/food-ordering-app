import React from 'react';
// We don't need loadStripe anymore because we redirect via URL now!

const Cart = ({ cart, addToCart, removeFromCart, setView }) => {
  const subtotal = cart.reduce((a, c) => a + c.price * c.qty, 0);
  const deliveryFee = subtotal > 0 ? 5.00 : 0;
  const total = subtotal + deliveryFee;

  // --- STRIPE PAYMENT LOGIC (FIXED) ---
  const makePayment = async () => {
    
    // 1. Match the Backend Expectation: Use 'cartItems'
    const body = {
      cartItems: cart 
    };

    const headers = {
      "Content-Type": "application/json"
    };

    try {
      // 2. Call the Backend
      const response = await fetch("https://flavorfleet-api.onrender.com", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      });

      const session = await response.json();

      // 3. Handle Errors
      if (!response.ok) {
        console.error("Server Error:", session.error);
        alert("Payment Failed: " + (session.error || "Unknown Error"));
        return;
      }

      // 4. Redirect using the URL (The Modern Way)
      if (session.url) {
        window.location.href = session.url;
      } else {
        console.error("Error: No Payment URL received");
      }
      
    } catch (error) {
      console.error("Network Error:", error);
    }
  };

  return (
    <div className="cart-page">
      <h2>Your Order</h2>
      
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <button onClick={() => setView('menu')}>Browse Menu</button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>${item.price}</p>
                </div>
                <div className="qty-controls">
                  <button onClick={() => removeFromCart(item)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => addToCart(item)}>+</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Bill Details</h3>
            <div className="summary-row"><span>Item Total</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="summary-row"><span>Delivery Fee</span><span>${deliveryFee.toFixed(2)}</span></div>
            <hr />
            <div className="summary-row total"><span>To Pay</span><span>${total.toFixed(2)}</span></div>
            
            <button className="checkout-btn" onClick={makePayment}>
              Pay with Stripe
            </button>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;