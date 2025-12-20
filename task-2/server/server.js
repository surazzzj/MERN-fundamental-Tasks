import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/mongodb.js";
import cartRoutes from "./routes/cartRoutes.js"

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
connectDb();

const port = process.env.Port || 4000;

app.get("/", (req,res) => {
    res.send("Api working....");
})

app.use('/api/cart', cartRoutes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})