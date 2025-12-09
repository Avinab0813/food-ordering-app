import React from 'react';
import './App.css'; // We will use shared styles

const Home = ({ setView }) => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Delicious Food, Delivered To You</h1>
        <p>Choose from thousands of flavors for pickup or delivery.</p>
        <button className="cta-btn" onClick={() => setView('menu')}>Order Now</button>
      </div>

      <div className="categories-section">
        <h2>What's on your mind?</h2>
        <div className="category-grid">
          {['Burger', 'Pizza', 'Asian', 'Dessert', 'Healthy', 'Drinks'].map((cat) => (
            <div key={cat} className="cat-card" onClick={() => setView('menu')}>
              <div className="cat-circle">😋</div>
              <span>{cat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;