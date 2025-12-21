import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import { products } from "../assets/assets";
import "../App.css";

const Home = () => {
  const { backendUrl } = useContext(AppContext);
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/cart`);
      if (res.data.success) {
        setCart(res.data.items);
      }
    } catch (err) {
      console.error("Load cart failed", err);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <div className="container">
      <h2 className="title">🛍 Products</h2>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            loadCart={loadCart}
          />
        ))}
      </div>

      <Cart cart={cart} loadCart={loadCart} />
    </div>
  );
};

export default Home;




