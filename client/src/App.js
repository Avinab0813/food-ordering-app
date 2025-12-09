// client/src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './Login';
import Home from './Home';
import Menu from './Menu';
import Cart from './Cart';
import Payment from './Payment'; 

function App() {
  const [view, setView] = useState('home'); 
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // --- STRIPE SUCCESS/CANCEL HANDLING ---
  // This checks the URL when the app loads to see if we just came back from Stripe
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/success') {
      setView('success');
      setCart([]); // Clear cart on success
    } else if (path === '/cancel') {
      setView('cancel');
    }
  }, []);

  // Add item to cart
  const addToCart = (item) => {
    const existing = cart.find((x) => x.id === item.id);
    if (existing) {
      setCart(cart.map((x) => x.id === item.id ? { ...existing, qty: existing.qty + 1 } : x));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (item) => {
    const existing = cart.find((x) => x.id === item.id);
    if (existing.qty === 1) {
      setCart(cart.filter((x) => x.id !== item.id));
    } else {
      setCart(cart.map((x) => x.id === item.id ? { ...existing, qty: existing.qty - 1 } : x));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((a, c) => a + c.qty, 0);

  // --- RENDER SUCCESS/CANCEL SCREENS ---
  if (view === 'success') {
    return (
      <div className="App">
        <div style={{ textAlign: 'center', marginTop: '100px', padding: '20px' }}>
          <h1 style={{ fontSize: '3rem' }}>🎉 Payment Successful!</h1>
          <p style={{ fontSize: '1.2rem', color: '#555' }}>Your delicious food is being prepared.</p>
          <button 
            className="cta-btn" 
            style={{ marginTop: '20px' }}
            onClick={() => { window.location.href = '/'; }} // Reload to clear URL
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  if (view === 'cancel') {
    return (
      <div className="App">
        <div style={{ textAlign: 'center', marginTop: '100px', padding: '20px' }}>
          <h1 style={{ fontSize: '3rem', color: 'red' }}>❌ Payment Canceled</h1>
          <p style={{ fontSize: '1.2rem', color: '#555' }}>You did not complete the payment.</p>
          <button 
            className="cta-btn" 
            style={{ marginTop: '20px', backgroundColor: '#333' }}
            onClick={() => { window.location.href = '/'; }} 
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // --- NORMAL APP RENDER ---
  return (
    <div className="App">
      <nav className="navbar">
        <div className="brand" onClick={() => setView('home')}>🍔 CraveBites</div>
        <div className="nav-links">
          <button onClick={() => setView('home')}>Home</button>
          <button onClick={() => setView('menu')}>Menu</button>
          <button onClick={() => setView('cart')} className="cart-btn">
            Cart 🛒 {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>
          <button onClick={() => setView('login')} className="login-btn">
            {user ? user : 'Login'}
          </button>
        </div>
      </nav>

      <main className="container">
        {view === 'home' && <Home setView={setView} />}
        {view === 'menu' && <Menu addToCart={addToCart} />}
        {view === 'payment' && <Payment setView={setView} cart={cart} clearCart={clearCart} />}
        {view === 'cart' && <Cart cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} setView={setView} />}
        {view === 'login' && <Login setUser={setUser} setView={setView} />}
      </main>
    </div>
  );
}

export default App;