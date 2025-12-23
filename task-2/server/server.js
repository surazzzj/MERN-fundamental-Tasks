  import "./config/env.js";   // ✅ MUST BE FIRST

  import express from "express";
  import cors from "cors";
  import connectDb from "./config/mongodb.js";
  import cartRoutes from "./routes/cartRoutes.js";
  import orderRoutes from "./routes/orderRoutes.js";
  import paymentRoutes from "./routes/paymentRoutes.js";

  const app = express();

  app.use(express.json());
  app.use(cors());
  connectDb();

  const port = process.env.PORT || 4000;

  app.get("/", (req, res) => {
    res.send("API working...");
  });

  app.use("/api/cart", cartRoutes);
  app.use("/api/order", orderRoutes);
  app.use("/api/payment", paymentRoutes);

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
