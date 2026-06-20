import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../config";
import { useCart } from "../context/CartContext";
import MenuCard from "../components/MenuCard";
import Toast from "../components/Toast";
import "./Home.css";

const Home = () => {
  const [popular, setPopular] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(API.getMenu)
      .then((res) => res.json())
      .then((data) => setPopular(data.slice(0, 3)))
      .catch((err) => console.log("Menu fetch error:", err));
  }, []);

  const handleAdd = (item) => {
    addToCart(item);
    setShowToast(true);
  };

  return (
    <div className="page">
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text fade-in">
            <span className="hero-tag">🔥 Fresh & Delicious</span>
            <h1>
              Welcome to <span>TastyBite</span>
            </h1>
            <p>
              Delicious food made with fresh ingredients, delivered straight
              to your table. Order in just a few clicks.
            </p>
            <Link to="/menu" className="btn btn-primary">
              Order Now →
            </Link>
          </div>
          <div className="hero-image fade-in">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80"
              alt="Delicious food"
            />
          </div>
        </div>
      </section>

      <section className="container popular-section">
        <h2 className="section-title">Popular Dishes</h2>
        <p className="section-subtitle">Hand-picked favorites our customers love</p>

        {popular.length === 0 ? (
          <p>Loading popular dishes...</p>
        ) : (
          <div className="menu-grid">
            {popular.map((item) => (
              <MenuCard key={item.id} item={item} onAdd={handleAdd} />
            ))}
          </div>
        )}
      </section>

      <Toast
        message="Added to cart!"
        show={showToast}
        onDone={() => setShowToast(false)}
      />
    </div>
  );
};

export default Home;
