import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

const Admin = () => {
  const { backendUrl } = useContext(AppContext);
  const [products, setProducts] = useState([]);
    
  const [editProduct, setEditProduct] = useState(null);

  const loadProducts = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/products`);
      setProducts(res.data.products);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      <h2>Admin Dashboard</h2>

      <ProductForm
        loadProducts={loadProducts}
        editProduct={editProduct}
        setEditProduct={setEditProduct}
      />

      <ProductList
        products={products}
        loadProducts={loadProducts}
        setEditProduct={setEditProduct}
      />
    </>
  );
};

export default Admin;
