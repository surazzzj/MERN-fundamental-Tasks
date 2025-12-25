import productModel from "../models/productModel.js"

//  CREATE
const createProduct = async (req, res) => {
    try {
        const product = await productModel.create(req.body);
        res.json({ success: true, product });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// READ
const getProduct = async (req, res) => {
    try {
        const products = await productModel.find();
        res.json({ success: true, products });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// UPDATE
const updateProduct = async (req, res) => {
    try {
        const product = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, product });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// DELETE
const deleteProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.id);
        res.json({success:true, message:"Product deleted"});
    } catch (error) {
        return res.json({success:false, message:error.message});
    }
}

export {createProduct, getProduct, updateProduct, deleteProduct}