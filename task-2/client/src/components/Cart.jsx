import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const Cart = ({ cart, loadCart }) => {
  const { backendUrl } = useContext(AppContext);

  const updateQty = async (productId, qty) => {
    if (qty < 1) return;
    await axios.put(`${backendUrl}/api/cart/update`, { productId, qty });
    loadCart();
  };

  const removeItem = async (productId) => {
    await axios.delete(`${backendUrl}/api/cart/remove/${productId}`);
    loadCart();
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handlePayment = async () => {
    try {
      const res = await axios.post(`${backendUrl}/api/payment/create-order`);

      if (!res.data.success || !res.data.order) {
        alert("Payment failed: Unable to create order");
        return;
      }

      const order = res.data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "My Shop",
        description: "Cart Payment",
        order_id: order.id,
        handler: async function (response) {
          await axios.post(`${backendUrl}/api/payment/verify`, response);
          alert("Payment Successful ✅");
          loadCart();
        }
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.log("Payment failed", error);
      alert("Payment failed: " + error.message);
    }
  };

  return (
    <div className="cart">
      <h2 className="title">🧾 Cart</h2>

      {cart.length === 0 && <p className="empty">Cart is empty</p>}

      {cart.map((item) => (
        <div className="cart-item" key={item.productId}>
          <div>
            <h4>{item.name}</h4>
            <p>₹{item.price} × {item.qty}</p>
          </div>

          <div className="cart-actions">
            <button onClick={() => updateQty(item.productId, item.qty - 1)}>-</button>
            <span>{item.qty}</span>
            <button onClick={() => updateQty(item.productId, item.qty + 1)}>+</button>
            <button className="remove" onClick={() => removeItem(item.productId)}>✕</button>
          </div>
        </div>
      ))}

      <h3 className="total">Total: ₹{total}</h3>

      {cart.length > 0 && (
        <button className="btn" onClick={handlePayment}>Pay Now</button>
      )}
    </div>
  );
};

export default Cart;
