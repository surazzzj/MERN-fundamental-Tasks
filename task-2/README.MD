# 🛒 Task-2: Add to Cart Functionality

## Task Overview

Implements a complete Add to Cart system with Razorpay Payment Gateway integration using the MERN stack.
The task focuses on real-world e-commerce workflows such as cart management, price calculations, secure order creation, and payment verification.

This implementation strengthens backend API design, frontend–backend synchronization, and secure payment handling without adding authentication complexity.

## 🚀 Features Implemented
### 🛍️ Cart Management

✅ Add products to cart and persist data in MongoDB

🔄 Update product quantities (increment / decrement)

❌ Remove items from cart

💰 Real-time cart total calculation

🔁 Persistent cart data fetched via backend APIs

### 💳 Payment Gateway (Razorpay)

💳 Razorpay Test Mode integration for secure payments

🧾 Dynamic order creation from backend based on cart total

🔐 Server-side payment verification using Razorpay signature (HMAC SHA256)

📦 Order details stored in MongoDB after successful payment

🧹 Automatic cart clearance after payment success

🚫 Safe handling of payment failures and invalid signatures
