import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
// Import Pages/Components
import Cart from "./Cart";
import Success from "./Success";
import Tracker from "./Tracker";
import Admin from "./Admin";
import { Routes, Route } from "react-router-dom";

// =================================================================
// ⚠️ API CONFIGURATION
// Use the Render URL for your Live Website.
// Use Localhost only if running the server on your laptop.
// =================================================================

const API_URL = "https://flavorfleet-api.onrender.com/api"; 
// const API_URL = "http://localhost:5000/api"; 

// =================================================================

// --- 1. SPLASH SCREEN ---
const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => { onFinish(); }, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <span className="splash-icon">🚀</span>
        <h1>FlavorFleet</h1>
        <p>Delicious food, delivered fast.</p>
      </div>
    </div>
  );
};

// --- 2. LOGIN PAGE ---
const LoginPage = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="login-container">
      <div className="login-overlay"></div>
      <div className="login-box">
        <div className="login-logo">🚀 FlavorFleet</div>
        <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>
        <p className="login-subtitle">
          {isSignup ? "Join us for tasty meals!" : "Login to access your favorites"}
        </p>

        <form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          {isSignup && (
            <div className="input-group">
              <input type="text" placeholder="Full Name" required />
            </div>
          )}
          <div className="input-group">
            <input type="email" placeholder="Email Address" required />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" required />
          </div>

          <button type="submit" className="login-btn">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="divider"><span>OR</span></div>

        <button className="guest-btn" onClick={onLogin}>
          Continue as Guest
        </button>

        <p className="toggle-text">
          {isSignup ? "Already have an account?" : "New to FlavorFleet?"} 
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? " Login" : " Create Account"}
          </span>
        </p>
      </div>
    </div>
  );
};

// --- 3. PROFILE PAGE ---
const Profile = () => {
  const [details, setDetails] = useState({ name: "Guest User", email: "guest@flavorfleet.com", address: "" });

  const handleChange = (e) => setDetails({ ...details, [e.target.name]: e.target.value });

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-card">
        <div className="profile-group">
          <label>Full Name</label>
          <input type="text" name="name" value={details.name} onChange={handleChange} />
        </div>
        <div className="profile-group">
          <label>Email</label>
          <input type="email" name="email" value={details.email} onChange={handleChange} />
        </div>
        <div className="profile-group">
          <label>Delivery Address</label>
          <input type="text" name="address" placeholder="Enter your address" value={details.address} onChange={handleChange} />
        </div>
        <button className="save-btn" onClick={() => alert("Profile Updated Successfully! ✅")}>Save Changes</button>
      </div>
    </div>
  );
};

// --- 4. MAIN FLAVORFLEET APP ---
function FlavorFleet() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);
  const [view, setView] = useState("menu"); 
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("All");

  // Fetch Menu
  const fetchFood = () => {
    axios.get(`${API_URL}/foods`)
      .then((res) => setFoods(res.data))
      .catch((err) => console.error("Error fetching food. Is the server running?", err));
  };

  useEffect(() => { fetchFood(); }, []);

  // Cart Logic
  const addToCart = (food) => {
    const exist = cart.find((x) => x._id === food._id);
    if (exist) {
      setCart(cart.map((x) => x._id === food._id ? { ...exist, qty: exist.qty + 1 } : x));
    } else {
      setCart([...cart, { ...food, qty: 1 }]);
    }
  };

  const removeFromCart = (food) => {
    const exist = cart.find((x) => x._id === food._id);
    if (exist.qty === 1) {
      setCart(cart.filter((x) => x._id !== food._id));
    } else {
      setCart(cart.map((x) => x._id === food._id ? { ...exist, qty: exist.qty - 1 } : x));
    }
  };

  // Filter Logic
  const filteredFoods = category === "All" 
    ? foods 
    : foods.filter((item) => item.category === category);
  
  const categories = ["All", "Burger", "Pizza", "Salad", "Appetizer", "Dessert", "Drink"];

  // Render Logic
  if (loading) return <SplashScreen onFinish={() => setLoading(false)} />;
  if (!user) return <LoginPage onLogin={() => setUser(true)} />;

  return (
    <div className="App">
      
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo" onClick={() => setView("menu")}>
          <span className="logo-icon">🚀</span> Flavor<span className="logo-highlight">Fleet</span>
        </div>
        <div className="nav-links">
          <button className={`nav-btn ${view === 'menu' ? 'active-link' : ''}`} onClick={() => setView("menu")}>Home</button>
          <button className={`nav-btn ${view === 'profile' ? 'active-link' : ''}`} onClick={() => setView("profile")}>Profile</button>
          <button className="nav-btn cart-btn-nav" onClick={() => setView("cart")}>
            Cart ({cart.reduce((a,c)=>a+c.qty,0)})
          </button>
        </div>
      </nav>

      {/* VIEW: MENU */}
      {view === "menu" && (
        <>
          <div className="hero">
            <div className="hero-content">
              <h1>Craving Delicious?</h1>
              <p>Order fresh food delivered to your doorstep in minutes.</p>
              <button className="cta-button" onClick={() => window.scrollTo(0, 600)}>View Menu ↓</button>
            </div>
          </div>

          <div className="main-content">
            {/* Filters */}
            <div className="filters">
              {categories.map((cat) => (
                <span 
                  key={cat} 
                  className={category === cat ? "active" : ""} 
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Food Grid */}
            <div className="food-grid">
              {filteredFoods.map((food) => {
                // Check if item is in cart
                const cartItem = cart.find(item => item._id === food._id);
                const isAdded = cartItem ? true : false;

                return (
                  <div key={food._id} className="food-card">
                    <div className="image-wrapper">
                      <img src={food.image} alt={food.name} className="food-image" />
                      <span className="cat-badge">{food.category}</span>
                    </div>
                    <div className="card-body">
                      <div className="card-header">
                        <h3>{food.name}</h3>
                        <span className="price">${food.price}</span>
                      </div>
                      <p className="food-desc">{food.description || "Fresh and delicious."}</p>
                      
                      {/* GREEN BUTTON LOGIC */}
                      <button 
                        className={isAdded ? "add-btn added" : "add-btn"} 
                        onClick={() => addToCart(food)}
                      >
                        {isAdded ? `Added (${cartItem.qty}) ✔` : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* VIEW: CART */}
      {view === "cart" && (
        <div className="main-content">
          <Cart 
            cart={cart} 
            addToCart={addToCart} 
            removeFromCart={removeFromCart} 
            setView={setView} 
          />
        </div>
      )}

      {/* VIEW: PROFILE */}
      {view === "profile" && (
        <div className="main-content">
          <Profile />
        </div>
      )}

    </div>
  );
}

// --- APP ROUTER ---
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