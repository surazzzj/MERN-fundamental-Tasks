import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const ProductList = ({ products, loadProducts, setEditProduct }) => {
  const { backendUrl } = useContext(AppContext);

  const del = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/products/delete/${id}`);
      loadProducts();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="products-grid">
      {products.map((p) => (
        <div className="card" key={p._id}>
          <img src={p.image} alt={p.name} className="product-img" />

          <h4>{p.name}</h4>
          <p className="price">₹{p.price}</p>
          <p className="desc">{p.description}</p>

          <div className="actions">
            <button onClick={() => setEditProduct(p)}>Edit</button>
            <button className="danger" onClick={() => del(p._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
