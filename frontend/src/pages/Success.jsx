import React from "react";
import { useLocation, Link, Navigate } from "react-router-dom";
import "./Success.css";

const Success = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;
  const paymentMethod = location.state?.paymentMethod;

  // If user lands here directly without placing an order, send them home
  if (!orderId) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="page container success-page fade-in">
      <div className="success-icon">✅</div>
      <h2>Order Placed Successfully!</h2>
      <p>Thank you for your order. We're preparing it now.</p>
      <div className="order-id-box">Order #{orderId}</div>
      {paymentMethod && (
        <p className="payment-confirm">
          Paid via <b>{paymentMethod}</b>
        </p>
      )}

      <div className="success-actions">
        <Link to="/orders" className="btn btn-primary">
          Track Order
        </Link>
        <Link to="/menu" className="btn btn-outline">
          Order More
        </Link>
      </div>
    </div>
  );
};

export default Success;
