import React from "react";

function Success() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ color: "green", fontSize: "3rem" }}>✅ Payment Successful!</h1>
      <p style={{ fontSize: "1.5rem" }}>Thank you for your order.</p>
      <p>Your food is being prepared.</p>
      
      <button 
        style={{ padding: "10px 20px", marginTop: "20px", cursor: "pointer" }}
        onClick={() => window.location.href = "/"}
      >
        Go Back to Menu
      </button>
    </div>
  );
}

export default Success;