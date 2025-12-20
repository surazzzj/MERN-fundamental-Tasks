import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: email, required: true },
    password: { type: String }
})

const userModel = mongoose.models.user || mongoose.model("User", userSchema);
export default userModel