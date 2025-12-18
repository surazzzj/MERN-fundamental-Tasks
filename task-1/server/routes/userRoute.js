import express from "express"
import { getUser, loginUser, registerUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get("/getdata", authMiddleware, getUser);


export default userRouter