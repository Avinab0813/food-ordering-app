import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Cart from "./Cart";
import Success from "./Success";
import Tracker from "./Tracker";
import Admin from "./Admin";
import { Routes, Route } from "react-router-dom";

// 🚀 LIVE SERVER URL (Do not change this to localhost)
const API_URL = "https://flavorfleet-api.onrender.com/api"; 

// --- SPLASH SCREEN ---
const SplashScreen = ({ onFinish }) => {
  useEffect(() => { setTimeout(() => onFinish(), 2000); }, [onFinish]);
  return <div className="splash-screen"><h1>🚀 FlavorFleet</h1></div>;
};

// --- LOGIN PAGE ---
const LoginPage = ({ onLogin }) => (
  <div className="login-container">
    <div className="login-overlay"></div>
    <div className="login-box">
      <div className="login-logo">🚀 FlavorFleet</div>
      <h2>Welcome Back</h2>
      <p className="login-subtitle">Login to access your favorites</p>
      <button className="guest-btn" onClick={onLogin}>Continue as Guest</button>
    </div>
  </div>
);

// --- MAIN APP ---
function FlavorFleet() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);
  const [view, setView] = useState("menu"); 
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    axios.get(`${API_URL}/foods`)
      .then((res) => setFoods(res.data))
      .catch((err) => console.error("Server Error:", err));
  }, []);

  const addToCart = (food) => {
    const exist = cart.find((x) => x._id === food._id);
    if (exist) setCart(cart.map((x) => x._id === food._id ? { ...exist, qty: exist.qty + 1 } : x));
    else setCart([...cart, { ...food, qty: 1 }]);
  };

  const removeFromCart = (food) => {
    const exist = cart.find((x) => x._id === food._id);
    if (exist.qty === 1) setCart(cart.filter((x) => x._id !== food._id));
    else setCart(cart.map((x) => x._id === food._id ? { ...exist, qty: exist.qty - 1 } : x));
  };

  const filteredFoods = category === "All" ? foods : foods.filter((item) => item.category === category);
  const categories = ["All", "Burger", "Pizza", "Salad", "Appetizer", "Dessert", "Drink"];

  if (loading) return <SplashScreen onFinish={() => setLoading(false)} />;
  if (!user) return <LoginPage onLogin={() => setUser(true)} />;

  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo" onClick={() => setView("menu")}>🚀 FlavorFleet</div>
        <div className="nav-links">
          <button className="nav-btn" onClick={() => setView("menu")}>Menu</button>
          <button className="nav-btn" onClick={() => setView("profile")}>Profile</button>
          <button className="cart-btn-nav" onClick={() => setView("cart")}>
            Cart ({cart.reduce((a,c)=>a+c.qty,0)})
          </button>
        </div>
      </nav>

      {view === "menu" && (
        <>
          <div className="hero">
            <div className="hero-content">
              <h1>Craving Delicious?</h1>
              <p>Order fresh food delivered to your doorstep.</p>
            </div>
          </div>

          <div className="main-content">
            <div className="filters">
              {categories.map(cat => (
                <span key={cat} className={category === cat ? "active" : ""} onClick={() => setCategory(cat)}>{cat}</span>
              ))}
            </div>

            <div className="food-grid">
              {filteredFoods.map((food) => {
                const cartItem = cart.find(item => item._id === food._id);
                return (
                  <div key={food._id} className="food-card">
                    <div className="image-wrapper">
                      <img src={food.image} alt={food.name} className="food-image" />
                      <span className="cat-badge">{food.category}</span>
                    </div>
                    <div className="card-body">
                      <div className="card-header">
                        <h3>{food.name}</h3><span className="price">${food.price}</span>
                      </div>
                      <p className="food-desc">{food.description}</p>
                      <button className={cartItem ? "add-btn added" : "add-btn"} onClick={() => addToCart(food)}>
                        {cartItem ? `Added ✔` : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {view === "cart" && <div className="main-content"><Cart cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} setView={setView} /></div>}
      {view === "profile" && <div className="main-content"><div className="profile-container"><h2>Guest Profile</h2></div></div>}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<FlavorFleet />} />
      <Route path="/success" element={<Success />} />
      <Route path="/tracker" element={<Tracker />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}
export default App;