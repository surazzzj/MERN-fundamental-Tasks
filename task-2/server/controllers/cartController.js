import cartModel from "../models/cartModel.js";

// GET CART
export const getCart = async (req, res) => {
  try {
    let cart = await cartModel.findOne();

    if (!cart) {
      cart = await cartModel.create({ items: [] });
    }

    res.json({ success: true, items: cart.items });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const { productId, name, price } = req.body;

    let cart = await cartModel.findOne();
    if (!cart) {
      cart = await cartModel.create({ items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (i) => i.productId === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].qty += 1;
    } else {
      cart.items.push({ productId, name, price, qty: 1 });
    }

    await cart.save();
    res.json({ success: true, items: cart.items });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// UPDATE QTY
export const updateQty = async (req, res) => {
  try {
    const { productId, qty } = req.body;

    const cart = await cartModel.findOne();
    const item = cart.items.find((i) => i.productId === productId);

    if (item) item.qty = qty;

    await cart.save();
    res.json({ success: true, items: cart.items });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// REMOVE ITEM
export const removeItem = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await cartModel.findOne();
    cart.items = cart.items.filter(
      (item) => item.productId !== productId
    );

    await cart.save();
    res.json({ success: true, items: cart.items });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
