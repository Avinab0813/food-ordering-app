import React, { useState } from 'react';
import { menuItems } from './data';

const Menu = ({ addToCart }) => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(menuItems.map(item => item.category))];

  const displayItems = filter === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === filter);

  return (
    <div className="menu-page">
      {/* Category Filters */}
      <div className="filters">
        {categories.map(cat => (
          <button 
            key={cat} 
            className={filter === cat ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Food Grid */}
      <div className="menu-grid">
        {displayItems.map((item) => (
          <div key={item.id} className="food-card">
            <div className="card-img-container">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="card-details">
              <div className="card-header">
                <h3>{item.name}</h3>
                <span className="price">${item.price}</span>
              </div>
              <p className="desc">{item.description}</p>
              <button className="add-btn-full" onClick={() => addToCart(item)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;