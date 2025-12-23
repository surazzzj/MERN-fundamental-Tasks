// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//   {
//     items: [
//       {
//         productId: String,
//         name: String,
//         price: Number,
//         qty: Number
//       }
//     ],
//     totalAmount: Number
//   },
//   { timestamps: true }
// );

// const orderModel =
//   mongoose.models.Order || mongoose.model("Order", orderSchema);

// export default orderModel;




import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        qty: Number
      }
    ],
    totalAmount: Number,
    paymentId: String,
    orderStatus: {
      type: String,
      default: "PLACED"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
