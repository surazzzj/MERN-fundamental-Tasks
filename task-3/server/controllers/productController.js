import productModel from "../models/productModel.js"
import cloudinary from "../config/cloudinary.js";

//  CREATE
const createProduct = async (req, res) => {
    try {

        const { name, price, description } = req.body;

        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image required" });
        }

        const result = await cloudinary.uploader.upload(req.file.path);

        const product = await productModel.create({
            name,
            price,
            description,
            image: result.secure_url,
        });
        res.json({ success: true, message: "Product added successfully", product });
    } catch (error) {
        console.error("error while adding....", error);
        return res.json({ success: false, message: error.message });
    }
}

// READ
const getProduct = async (req, res) => {
    try {
        const products = await productModel.find();
        res.json({ success: true, products });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
}

// UPDATE
const updateProduct = async (req, res) => {
    try {
             const updateData = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
      };

      if (req.file) {
        const img = await cloudinary.uploader.upload(req.file.path);
        updateData.image = img.secure_url;
      }

          const product = await productModel.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );
        res.json({ success: true, product });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
}

// DELETE
const deleteProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Product deleted" });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
}

export { createProduct, getProduct, updateProduct, deleteProduct }