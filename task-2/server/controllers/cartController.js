import cartModel from "../models/cartModel.js";
import jwt from "jsonwebtoken";

const getCart = async (req, res) => {
    try {

        let cart = await cartModel.findOne();
        if (!cart) {
            await cartModel.create({items: [] });
        }

          res.json({ success: true, items: cart.items });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

const addToCart = async (req, res) => {
    try {

        const { productId, name, price } = req.body;

        let cart = await cartModel.findOne();
        if (!cart) {
            cart = await cartModel.create({ items: [] })
        }

        const item = cart.items.find(i => i.productId === productId);
        if (item) {
            item.qty += 1;
        } else {
            cart.items.push({ productId, name, price, qty: 1 });
        }

        await cart.save();
        res.json({ success: true, items: cart.items });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

const updateQty = async (req, res) => {
    try {

        const { productId, qty } = req.body;

        const cart = await cartModel.findOne();
        cart.items = cart.items
        .map(item =>
            item.productId == productId
                ? { ...item, qty }
                : item
        ).filter(item => item.qty > 0);

        await cart.save();
         res.json({ success: true, items: cart.items });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

const removeItem = async (req, res) => {
    try {

        const { productId } = req.params;

        const cart = await cartModel.findOne();
        cart.items = cart.items.filter(item =>
            item.productId !== productId
        )

        await cart.save();
       res.json({ success: true, items: cart.items });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}


export { getCart, addToCart, updateQty, removeItem }

