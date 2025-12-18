import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Api endpoint for register user
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // If user missing any details while filling the form
        if (!name || !email || !password) {
            return res.json({ sucess: false, message: "Missing Details" });
        }

        // checking user exist or not
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        // generate the salt/hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user
        const user = new userModel({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        // Generate the token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

// Api endpoint for login user
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        // Finding user on the email basis
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// Api endpoint to get user data
const getUser = async (req, res) => {
    try {
        res.json({ success: true, user: req.user })
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export { registerUser, loginUser, getUser };


