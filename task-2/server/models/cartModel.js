import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      qty: Number
    }
  ]
});

const cartModel =
  mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default cartModel;
