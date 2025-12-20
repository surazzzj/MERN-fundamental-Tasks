import express from "express";
import { addToCart, getCart, removeItem, updateQty } from "../controllers/cartController.js";
const router = express.Router();

router.get('/', getCart);
router.post('/add', addToCart);
router.put('/update', updateQty);
router.delete('/remove/:productId', removeItem);

export default router;