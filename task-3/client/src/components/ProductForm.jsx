import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const ProductForm = ({ loadProducts, editProduct, setEditProduct }) => {

  const { backendUrl } = useContext(AppContext);

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: ""
  });

  useEffect(() => {
    if (editProduct) {
      setForm(editProduct);
    }
  }, [editProduct]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {

      if (editProduct) {
        await axios.put(
          backendUrl + `/api/products/update/${editProduct._id}`,
          form
        );
        setEditProduct(null);
      } else {
        await axios.post(backendUrl + "/api/products/add", form);
      }

      setForm({
        name: "",
        price: "",
        image: "",
        description: ""
      });

      loadProducts();

    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <input name="name" onChange={changeHandler} placeholder="Name" value={form.name} />
      <input name="price" onChange={changeHandler} placeholder="Price" value={form.price} />
      <input name="image" onChange={changeHandler} placeholder="Image URL" value={form.image} />
      <input name="description" onChange={changeHandler} placeholder="Description" value={form.description} />

      <button>{editProduct ? "Update Product" : "Add Product"}</button>
    </form>
  );
};

export default ProductForm;
