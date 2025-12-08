import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
// Import Routing Tools
import { Routes, Route } from "react-router-dom";

// Import All Pages
import Success from "./Success";
import Tracker from "./Tracker";
import Admin from "./Admin"; // <--- New Admin Page

// --- MENU COMPONENT (The Home Page) ---
function Menu() {
  const [foods, setFoods] = useState([]);

  // 1. Fetch Menu from Server
  useEffect(() => {
    axios.get("http://localhost:5000/api/foods")
      .then((response) => setFoods(response.data))
      .catch((error) => console.error("Error fetching food:", error));
  }, []);

  // 2. Handle Payment Button
  const makePayment = async (food) => {
    const body = {
      products: [food],
    };

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      // Ask Backend to create a Stripe Session
      const response = await fetch("http://localhost:5000/api/create-checkout-session", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      const session = await response.json();

      // Redirect to the Stripe URL
      if (session.url) {
        window.location.href = session.url;
      } else {
        console.error("Error: No URL returned from server");
      }

    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🍔 Food Ordering App</h1>
        {/* Simple Link to Admin Panel for easy access */}
        <a href="/admin" style={{ color: "white", fontSize: "0.8rem", float: "right" }}>
          Admin Login
        </a>
      </header>

      <div className="menu-container">
        {foods.length === 0 ? (
          <p>Loading menu...</p>
        ) : (
          foods.map((food) => (
            <div key={food._id} className="food-card">
              <img src={food.image} alt={food.name} className="food-image" />
              <div className="food-info">
                <h2>{food.name}</h2>
                <p className="description">{food.description}</p>
                <div className="price-row">
                  <span className="price">${food.price}</span>
                  <button className="add-btn" onClick={() => makePayment(food)}>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// --- MAIN APP COMPONENT (The Router) ---
function App() {
  return (
    <Routes>
      {/* Route 1: The Menu (Home) */}
      <Route path="/" element={<Menu />} />
      
      {/* Route 2: Success Page */}
      <Route path="/success" element={<Success />} />
      
      {/* Route 3: Real-Time Tracker */}
      <Route path="/tracker" element={<Tracker />} />
      
      {/* Route 4: Admin Dashboard (New) */}
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;