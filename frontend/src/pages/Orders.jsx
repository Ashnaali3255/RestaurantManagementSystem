import React, { useEffect, useState } from "react";
import { API } from "../config";
import "./Orders.css";

const statusClass = (status) => {
  const s = (status || "").toLowerCase();
  if (s === "pending") return "status pending";
  if (s === "preparing") return "status preparing";
  if (s === "completed" || s === "delivered") return "status completed";
  return "status";
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(API.getOrders)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Orders fetch error:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page container">
      <h2 className="section-title">📦 All Orders</h2>
      <p className="section-subtitle">Track the status of placed orders</p>

      {loading && <p>Loading orders...</p>}
      {error && (
        <p className="error-text">
          Could not load orders. Please check your backend connection.
        </p>
      )}
      {!loading && !error && orders.length === 0 && (
        <p>No orders placed yet.</p>
      )}

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card fade-in">
            <div className="order-card-top">
              <span className="order-id">Order #{order.id}</span>
              <span className={statusClass(order.status)}>
                {order.status}
              </span>
            </div>
            <p>
              <b>Customer:</b> {order.customer_name}
            </p>
            <p>
              <b>Total:</b> Rs. {order.total}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
