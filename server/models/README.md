# 🍔 MERN Stack Food Ordering App

A full-stack food delivery platform offering real-time order tracking, secure payments, and a dynamic menu system. Built with the MERN stack (MongoDB, Express, React, Node.js).

![Status](https://img.shields.io/badge/Status-Completed-success)
![Tech](https://img.shields.io/badge/Tech-MERN_Stack-blue)
![Payment](https://img.shields.io/badge/Payment-Stripe-violet)

---

## 📸 Screenshots

### 🏠 The Menu (Home)
*Users can browse food items with a responsive, modern UI.*
![Home Page](home.png)

### 📦 Real-Time Tracker
*Live order updates using Socket.io (Preparing -> Delivered).*
![Tracker Page](tracker.png)

### 👨‍🍳 Admin Dashboard
*Restaurant owners can view and manage incoming orders.*
![Admin Page](admin.png)

---

## 🚀 Key Features

*   **Real-Time Tracking:** integrated **Socket.io** for instant status updates without page refreshes.
*   **Secure Payments:** Full **Stripe API** integration for credit card processing.
*   **Dynamic Data:** All food items and orders are stored in **MongoDB Atlas**.
*   **Admin Panel:** A dedicated dashboard for business owners.
*   **Responsive Design:** Styled with modern CSS for mobile and desktop.

## 🛠️ Tech Stack

*   **Frontend:** React.js, React Router, Hooks, Axios
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB Atlas (Cloud)
*   **Tools:** Socket.io, Stripe.js, Git

---

## 📦 How to Run Locally

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/Avinab0813/food-ordering-app.git
    cd food-ordering-app
    ```

2.  **Install Dependencies:**
    ```bash
    # Install Server dependencies
    cd server
    npm install

    # Install Client dependencies
    cd ../client
    npm install
    ```

3.  **Setup Secrets (.env):**
    Create a `.env` file in the `server` folder:
    ```env
    MONGO_URI=your_mongodb_url
    STRIPE_SECRET_KEY=your_stripe_secret_key
    CLIENT_URL=http://localhost:3000
    PORT=5000
    ```

4.  **Run the App:**
    ```bash
    # Terminal 1 (Server)
    cd server
    node index.js

    # Terminal 2 (Client)
    cd client
    npm start
    ```