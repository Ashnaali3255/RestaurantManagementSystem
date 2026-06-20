import React from "react";
import "./PaymentProcessing.css";

const PaymentProcessing = ({ show, method }) => {
  if (!show) return null;

  return (
    <div className="payment-overlay">
      <div className="payment-modal fade-in">
        <div className="spinner"></div>
        <h3>Processing your {method} payment...</h3>
        <p>Please don't close this window</p>
      </div>
    </div>
  );
};

export default PaymentProcessing;
