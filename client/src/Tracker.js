import React, { useEffect, useState } from "react";
import io from "socket.io-client";

// Connect to Backend
const socket = io.connect("https://flavorfleet-api.onrender.com");

function Tracker() {
  const [status, setStatus] = useState("Order Received ✅");

  useEffect(() => {
    // Listen for updates from the server
    socket.on("order_status", (data) => {
      setStatus(data); // Update the text on screen automatically
    });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>📦 Live Order Tracking</h1>
      
      <div style={{ 
        marginTop: "30px", 
        padding: "20px", 
        border: "2px solid #ddd", 
        borderRadius: "10px",
        display: "inline-block"
      }}>
        <h2 style={{ color: "#ff4757", fontSize: "2rem" }}>
          {status}
        </h2>
        <p>Watch this space! The status will update automatically.</p>
      </div>

      <br />
      <button 
        style={{ marginTop: "20px", padding: "10px" }} 
        onClick={() => window.location.href = "/"}
      >
        Order More Food
      </button>
    </div>
  );
}

export default Tracker;