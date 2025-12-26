import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const ProductForm = ({ loadProducts, editProduct, setEditProduct }) => {
  const { backendUrl } = useContext(AppContext);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  // Populate form when editing
  useEffect(() => {
    if (editProduct) {
      setForm({
        name: editProduct.name,
        price: editProduct.price,
        description: editProduct.description,
        image: null, 
      });
    }
  }, [editProduct]);

  // Handle text inputs
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input separately
  const imageHandler = (e) => {
    setForm((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("price", form.price);
      data.append("description", form.description);

      if (form.image) {
        data.append("image", form.image);
      }

      if (editProduct) {
        await axios.put(
          `${backendUrl}/api/products/update/${editProduct._id}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setEditProduct(null);
      } else {
        await axios.post(
          `${backendUrl}/api/products/add`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      setForm({
        name: "",
        price: "",
        description: "",
        image: null,
      });

      loadProducts();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <input
        name="name"
        type="text"
        placeholder="Product Name"
        value={form.name}
        onChange={changeHandler}
        required
      />

      <input
        name="price"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={changeHandler}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={changeHandler}
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={imageHandler}
      />

      <button type="submit">
        {editProduct ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;
