import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";

const Cart = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart, getTotal } =
    useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="page container cart-empty">
        <h2>🛒 Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/menu" className="btn btn-primary">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="page container">
      <h2 className="section-title">🛒 Your Cart</h2>
      <p className="section-subtitle">Review your items before checkout</p>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item fade-in">
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <span className="cart-item-price">Rs. {item.price} each</span>
              </div>

              <div className="qty-control">
                <button onClick={() => decreaseQty(item.id)}>−</button>
                <span>{item.qty}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>

              <div className="cart-item-subtotal">
                Rs. {item.price * item.qty}
              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
                title="Remove item"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>Rs. {getTotal()}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>Rs. {getTotal()}</span>
          </div>
          <button
            className="btn btn-primary btn-block"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
          <Link to="/menu" className="btn btn-outline btn-block continue-link">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
