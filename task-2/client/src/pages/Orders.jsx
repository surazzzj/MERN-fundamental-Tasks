import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const Orders = () => {
  const { backendUrl } = useContext(AppContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/order`)
      .then((res) => setOrders(res.data.orders));
  }, []);

  return (
    <div>
      <h2>📦 My Orders</h2>

      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <p>Order ID: {order._id}</p>
          <p>Total: ₹{order.totalAmount}</p>
          <p>Status: {order.orderStatus}</p>
        </div>
      ))}
    </div>
  );
};

export default Orders;
