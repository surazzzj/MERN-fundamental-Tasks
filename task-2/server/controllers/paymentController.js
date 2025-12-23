// import Razorpay from "razorpay";
// import crypto from "crypto";
// import cartModel from "../models/cartModel.js";
// import orderModel from "../models/orderModel.js";

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// // CREATE ORDER
// export const createOrder = async (req, res) => {
//   try {
//     const cart = await cartModel.findOne();
//     if (!cart || cart.items.length === 0) {
//       return res.json({ success: false, message: "Cart is empty" });
//     }

//     // const amount =
//     //   cart.items.reduce((sum, item) => sum + item.price * item.qty, 0) * 100;

//     const amount = cart.items.reduce((sum, item) => sum + item.price * item.qty, 0) * 100;

//     if (amount > 7499900) {
//       return res.json({ success: false, message: "Amount exceeds test mode limit" });
//     }


//     const order = await razorpay.orders.create({
//       amount,
//       currency: "INR",
//       payment_capture: 1
//     });

//     if (!order) {
//       return res.json({ success: false, message: "Razorpay order creation failed" });
//     }

//     res.json({ success: true, order }); // ✅ Return full order object
//   } catch (error) {
//     console.log("Create order error:", error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // VERIFY PAYMENT
// export const verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.json({ success: false, message: "Invalid payment signature" });
//     }

//     const cart = await cartModel.findOne();
//     const total = cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);

//     await orderModel.create({
//       items: cart.items,
//       totalAmount: total
//     });

//     cart.items = [];
//     await cart.save();

//     res.json({ success: true, message: "Payment successful" });
//   } catch (error) {
//     console.log("Verify payment error:", error);
//     res.json({ success: false, message: error.message });
//   }
// };







import Razorpay from "razorpay";
import crypto from "crypto";
import cartModel from "../models/cartModel.js";
import orderModel from "../models/orderModel.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const cart = await cartModel.findOne();
    if (!cart || cart.items.length === 0) {
      return res.json({ success: false, message: "Cart empty" });
    }

    const amount =
      cart.items.reduce((sum, i) => sum + i.price * i.qty, 0) * 100;

    const order = await razorpay.orders.create({
      amount,
      currency: "INR"
    });

    res.json({ success: true, order });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// VERIFY PAYMENT + SAVE ORDER
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.json({ success: false, message: "Invalid payment" });
    }

    const cart = await cartModel.findOne();
    const total = cart.items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    await orderModel.create({
      items: cart.items,
      totalAmount: total,
      paymentId: razorpay_payment_id
    });

    cart.items = [];
    await cart.save();

    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
