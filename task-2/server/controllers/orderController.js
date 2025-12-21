import cartModel from "../models/cartModel.js";
import orderModel from "../models/orderModel.js";

export const placeOrder = async (req, res) => {
  try {
    const cart = await cartModel.findOne();

    if (!cart || cart.items.length === 0) {
      return res.json({ success: false, message: "Cart empty" });
    }

    const total = cart.items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const order = await orderModel.create({
      items: cart.items,
      totalAmount: total
    });

    cart.items = [];
    await cart.save();

    res.json({ success: true, order });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
