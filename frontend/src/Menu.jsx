import React, { useEffect, useState } from "react";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");

  // Load menu
  useEffect(() => {
    fetch("http://localhost/restuarant-backend/getMenu.php")
      .then((res) => res.json())
      .then((data) => setMenu(data))
      .catch((err) => console.log("Menu fetch error:", err));
  }, []);

  // Add to cart
  const addToCart = (item) => {
    const exist = cart.find((x) => x.id === item.id);

    if (exist) {
      setCart(
        cart.map((x) =>
          x.id === item.id ? { ...x, qty: x.qty + 1 } : x
        )
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  // Total
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.qty, 0);
  };

  // ✅ FIXED placeOrder
  const placeOrder = async () => {
    if (!customerName) {
      alert("Please enter your name");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const orderData = {
      customer_name: customerName, // ✅ FIX HERE
      total: getTotal(),
      items: cart
    };

    console.log("Sending data:", orderData);

    try {
      const res = await fetch(
        "http://localhost/restuarant-backend/addOrder.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(orderData)
        }
      );

      const data = await res.json();
      console.log("Response:", data);

      if (data.success) {
        alert("Order Placed Successfully!");
        setCart([]);
        setCustomerName(""); // reset input
      } else {
        alert("Order Failed!");
      }
    } catch (error) {
      console.log("Error:", error);
      alert("Server error!");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
      
      {/* MENU */}
      <div style={{ width: "55%" }}>
        <h2>🍲 Menu</h2>

        {menu.map((item) => (
          <div
            key={item.id}
            style={{
              border: "2px solid #eee",
              margin: "10px",
              padding: "10px",
              borderRadius: "10px"
            }}
          >
            <h3>{item.name}</h3>
            <p>Rs. {item.price}</p>
            <button onClick={() => addToCart(item)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* CART */}
      <div
        style={{
          width: "35%",
          border: "2px solid #000",
          padding: "15px",
          borderRadius: "10px",
          height: "fit-content",
          position: "sticky",
          top: "20px"
        }}
      >
        <h2>🛒 Cart</h2>

        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.id}>
              {item.name} x {item.qty} = Rs. {item.price * item.qty}
            </div>
          ))
        )}

        <hr />

        <h3>Total: Rs. {getTotal()}</h3>

        {/* ✅ Name Input */}
        <input
          type="text"
          placeholder="Enter your name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          style={{
            padding: "8px",
            width: "86%",
            marginBottom: "10px"
          }}
        />

        {cart.length > 0 && (
          <button
            onClick={placeOrder}
            style={{
              padding: "10px",
              width: "100%",
              background: "green",
              color: "white",
              border: "none",
              cursor: "pointer"
            }}
          >
            Place Order
          </button>
        )}
      </div>
    </div>
  );
};

export default Menu;