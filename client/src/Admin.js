import React, { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [orders, setOrders] = useState([]);

  // Fetch orders when page loads
  useEffect(() => {
    axios.get("http://localhost:5000/api/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "50px" }}>
      <h1>👨‍🍳 Restaurant Admin Dashboard</h1>
      <h2>Incoming Orders</h2>

      <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Items</th>
            <th>Total Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>Guest</td>
              <td>
                {/* List items in the order */}
                {order.items?.map(item => (
                  <div key={item.name}>
                    {item.quantity}x {item.name}
                  </div>
                )) || "Test Data"}
              </td>
              <td>${order.totalAmount || "0"}</td>
              <td style={{ color: "green", fontWeight: "bold" }}>
                {order.status || "Paid"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;