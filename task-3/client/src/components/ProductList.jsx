import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const ProductList = ({ products, loadProducts, setEditProduct }) => {

  const { backendUrl } = useContext(AppContext);

  const del = async (id) => {
    try {
      await axios.delete(backendUrl + `/api/products/delete/${id}`);
      loadProducts();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {products.map((p) => (
        <div className="card" key={p._id}>

          {p.image && (
            <img
              src={p.image}
              alt={p.name}
              style={{ width: "150px", display: "block" }}
            />
          )}

          <h4>{p.name}</h4>
          <p>₹{p.price}</p>

          {p.description && <p>{p.description}</p>}

          <button onClick={() => setEditProduct(p)}>Edit</button>

          <button onClick={() => del(p._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
