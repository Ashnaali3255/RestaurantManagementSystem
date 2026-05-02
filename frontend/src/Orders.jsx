import React, { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost/restaurant-backend/getOrders.php")
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div>
      <h2>📦 All Orders</h2>

      {orders.map(order => (
        <div key={order.id} style={{border:"1px solid #ccc", margin:"10px", padding:"10px"}}>
          <p><b>Name:</b> {order.customer_name}</p>
          <p><b>Total:</b> Rs. {order.total}</p>
          <p><b>Status:</b> {order.status}</p>
        </div>
      ))}

    </div>
  );
}

export default Orders;