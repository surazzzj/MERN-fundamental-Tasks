import mongoose from "mongoose";

mongoose.connection.on("connected", () => {
    console.log("✅ Database connected succesfully....");
})

mongoose.connection.on("error", (error) => {
    console.log("❌ MongoDB connection error:", error);
})

const connectDb = () => {
    mongoose.connect(process.env.MONGODB_URI)
        .catch((error) => {
            console.log("❌ Initial MongoDB connection error:", error);
        })
}

export default connectDb;