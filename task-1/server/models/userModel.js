import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String }
}) 

const userModel = mongoose.models.user || mongoose.model('user', userSchema);
export default userModel