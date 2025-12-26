import express from "express";
import { createProduct, deleteProduct, getProduct, updateProduct } from "../controllers/productController.js";
import upload from "../config/upload.js";
const router = express.Router();

router.post("/add", upload.single("image"), createProduct);
router.get("/", getProduct);
router.put("/update/:id", upload.single("image"), updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router