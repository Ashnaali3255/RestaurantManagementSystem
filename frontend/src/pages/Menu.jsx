import React, { useEffect, useState } from "react";
import { API } from "../config";
import { useCart } from "../context/CartContext";
import MenuCard from "../components/MenuCard";
import Toast from "../components/Toast";
import "./Menu.css";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(API.getMenu)
      .then((res) => res.json())
      .then((data) => {
        setMenu(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Menu fetch error:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  const handleAdd = (item) => {
    addToCart(item);
    setShowToast(true);
  };

  const filteredMenu = menu.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page container">
      <h2 className="section-title">🍲 Our Menu</h2>
      <p className="section-subtitle">Choose from our delicious selection</p>

      <input
        type="text"
        className="menu-search"
        placeholder="Search dishes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Loading menu...</p>}
      {error && (
        <p className="error-text">
          Could not load menu. Please check that your backend server is
          running and the API URL in <code>src/config.js</code> is correct.
        </p>
      )}

      {!loading && !error && filteredMenu.length === 0 && (
        <p>No dishes found.</p>
      )}

      <div className="menu-grid">
        {filteredMenu.map((item) => (
          <MenuCard key={item.id} item={item} onAdd={handleAdd} />
        ))}
      </div>

      <Toast
        message="Added to cart!"
        show={showToast}
        onDone={() => setShowToast(false)}
      />
    </div>
  );
};

export default Menu;
