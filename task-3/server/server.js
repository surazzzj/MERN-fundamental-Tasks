import "./config/env.js";
import express from "express";
import cors from "cors";
import connectDb from "./config/mongodb.js";
import productRoutes from "./routes/productRoute.js" 

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


connectDb();

const port = process.env.Port || 4000;

app.get("/", (req,res) => {
    res.send("Api working.....");           // testing..
})

app.use("/api/products", productRoutes);

app.listen(port,() => {
    console.log(`Server is running on Port ${port}`);
})