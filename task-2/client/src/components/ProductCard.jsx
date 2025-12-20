import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const ProductCard = ({ product, loadCart }) => {
  const { backendUrl } = useContext(AppContext);

  const addToCart = async () => {
    try {
      await axios.post(`${backendUrl}/api/cart/add`, {
        productId: product._id,
        name: product.name,
        price: product.price,
      });
      loadCart();
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  return (
    <div className="product-card">
      <div className="product-img">
        <img src={product.image} alt={product.name} />
      </div>

      <h4>{product.name}</h4>
      <p className="price">₹{product.price}</p>

      <button className="btn" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
