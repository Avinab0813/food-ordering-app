import React from 'react';

const Cart = ({ cart, addToCart, removeFromCart, setView }) => {
  const total = cart.reduce((a, c) => a + c.price * c.qty, 0) + (cart.length > 0 ? 5 : 0);
  
  const makePayment = async () => {
    try {
      // 🚀 LIVE SERVER URL
      const response = await fetch("https://flavorfleet-api.onrender.com/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems: cart })
      });
      const session = await response.json();
      
      if (session.url) {
        window.location.href = session.url;
      } else {
        alert("Payment Error: " + (session.error || "Unknown"));
      }
    } catch (err) {
      console.error(err);
      alert("Network Error: Could not reach server.");
    }
  };

  return (
    <div className="cart-page">
      <h2>Your Order</h2>
      {cart.length === 0 ? (
        <div className="empty-cart"><p>Your cart is empty.</p><button className="nav-btn" onClick={() => setView('menu')}>Browse Menu</button></div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-info"><h4>{item.name}</h4><p>${item.price}</p></div>
                <div className="qty-controls">
                  <button onClick={() => removeFromCart(item)}>-</button><span>{item.qty}</span><button onClick={() => addToCart(item)}>+</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Bill Details</h3>
            <div className="summary-row"><span>Item Total</span><span>${(total - 5).toFixed(2)}</span></div>
            <div className="summary-row"><span>Delivery Fee</span><span>$5.00</span></div>
            <hr />
            <div className="summary-row total"><span>To Pay</span><span>${total.toFixed(2)}</span></div>
            <button className="checkout-btn" onClick={makePayment}>Pay with Stripe</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cart;