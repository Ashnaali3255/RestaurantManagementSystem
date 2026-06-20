import React from "react";
import "./MenuCard.css";

// Placeholder image generator since DB has no image_url column yet
const getPlaceholderImage = (name) => {
  const colors = ["e25822", "2d2424", "c44615", "6b6b6b"];
  const color = colors[name.length % colors.length];
  return `https://placehold.co/300x200/${color}/ffffff?text=${encodeURIComponent(
    name
  )}`;
};

const MenuCard = ({ item, onAdd }) => {
  return (
    <div className="menu-card fade-in">
      <img
        src={item.image_url || getPlaceholderImage(item.name)}
        alt={item.name}
        className="menu-card-img"
      />
      <div className="menu-card-body">
        <h3>{item.name}</h3>
        <div className="menu-card-footer">
          <span className="menu-card-price">Rs. {item.price}</span>
          <button className="btn btn-primary" onClick={() => onAdd(item)}>
            + Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
