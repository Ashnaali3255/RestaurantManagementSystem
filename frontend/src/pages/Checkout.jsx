import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API } from "../config";
import { useCart } from "../context/CartContext";
import PaymentMethod from "../components/PaymentMethod";
import PaymentProcessing from "../components/PaymentProcessing";
import "./Checkout.css";

const Checkout = () => {
  const { cart, getTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [walletNumber, setWalletNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [error, setError] = useState("");

  if (cart.length === 0) {
    return (
      <div className="page container cart-empty">
        <h2>Nothing to checkout</h2>
        <p>Your cart is empty. Add some items first.</p>
        <Link to="/menu" className="btn btn-primary">
          Browse Menu
        </Link>
      </div>
    );
  }

  const submitOrder = async () => {
    const orderData = {
      customer_name: name,
      phone: phone,
      address: address,
      payment_method: paymentMethod,
      total: getTotal(),
      items: cart,
    };

    setLoading(true);
    try {
      const res = await fetch(API.addOrder, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      const data = await res.json();

      if (data.success) {
        clearCart();
        navigate("/success", {
          state: { orderId: data.order_id, paymentMethod },
        });
      } else {
        setError(data.error || "Order failed. Please try again.");
      }
    } catch (err) {
      console.log("Checkout error:", err);
      setError("Server error. Please check your connection and try again.");
    } finally {
      setLoading(false);
      setProcessingPayment(false);
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    const needsWallet =
      paymentMethod === "JazzCash" || paymentMethod === "EasyPaisa";
    if (needsWallet && !walletNumber.trim()) {
      setError(`Please enter your ${paymentMethod} mobile number.`);
      return;
    }

    // Simulate a realistic payment processing delay before placing the order.
    // This mimics the wallet/bank confirmation step without a real gateway.
    if (paymentMethod === "COD") {
      submitOrder();
    } else {
      setProcessingPayment(true);
      setTimeout(() => {
        submitOrder();
      }, 2200);
    }
  };

  return (
    <div className="page container">
      <h2 className="section-title">Checkout</h2>
      <p className="section-subtitle">Enter your details to place the order</p>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handlePlaceOrder}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="e.g. Ali Khan"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="e.g. 03001234567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label>Delivery Address</label>
          <textarea
            rows="3"
            placeholder="House #, Street, City"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <PaymentMethod
            selected={paymentMethod}
            onSelect={setPaymentMethod}
            walletNumber={walletNumber}
            onWalletChange={setWalletNumber}
          />

          {error && <p className="error-text">{error}</p>}

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading || processingPayment}
          >
            {loading || processingPayment
              ? "Processing..."
              : paymentMethod === "COD"
              ? "Place Order"
              : `Pay & Place Order`}
          </button>
        </form>

        <div className="checkout-summary">
          <h3>Order Summary</h3>
          {cart.map((item) => (
            <div className="summary-row" key={item.id}>
              <span>
                {item.name} x {item.qty}
              </span>
              <span>Rs. {item.price * item.qty}</span>
            </div>
          ))}
          <div className="summary-row total">
            <span>Total</span>
            <span>Rs. {getTotal()}</span>
          </div>
        </div>
      </div>

      <PaymentProcessing show={processingPayment} method={paymentMethod} />
    </div>
  );
};

export default Checkout;
