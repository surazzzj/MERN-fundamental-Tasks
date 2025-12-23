import express from "express";
import {
  placeOrder,
  getOrders,
  getOrderById
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/place", placeOrder);
router.get("/", getOrders);

router.get("/:id", getOrderById);

export default router;
