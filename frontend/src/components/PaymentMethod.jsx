import React from "react";
import "./PaymentMethod.css";

const methods = [
  { id: "JazzCash", label: "JazzCash", icon: "📱", color: "#e6007e" },
  { id: "EasyPaisa", label: "EasyPaisa", icon: "💚", color: "#00a651" },
  { id: "BankTransfer", label: "Bank Transfer", icon: "🏦", color: "#2563eb" },
  { id: "COD", label: "Cash on Delivery", icon: "💵", color: "#b8761a" },
];

const PaymentMethod = ({ selected, onSelect, walletNumber, onWalletChange }) => {
  const needsWalletNumber = selected === "JazzCash" || selected === "EasyPaisa";

  return (
    <div className="payment-method">
      <label className="payment-label">Payment Method</label>

      <div className="payment-options">
        {methods.map((m) => (
          <button
            type="button"
            key={m.id}
            className={`payment-option ${selected === m.id ? "selected" : ""}`}
            onClick={() => onSelect(m.id)}
            style={{ "--accent": m.color }}
          >
            <span className="payment-icon">{m.icon}</span>
            <span>{m.label}</span>
          </button>
        ))}
      </div>

      {needsWalletNumber && (
        <div className="wallet-field fade-in">
          <label>{selected} Mobile Number</label>
          <input
            type="tel"
            placeholder="e.g. 03001234567"
            value={walletNumber}
            onChange={(e) => onWalletChange(e.target.value)}
          />
        </div>
      )}

      {selected === "BankTransfer" && (
        <div className="bank-details fade-in">
          <p>Transfer to the account below, then place your order:</p>
          <div className="bank-info">
            <span>Bank: Meezan Bank</span>
            <span>Account Title: TastyBite Restaurant</span>
            <span>Account No: 0123-4567890-01</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
