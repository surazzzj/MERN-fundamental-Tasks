## 🧩 Task 1 - MERN Authentication System (Login / Signup)

# Project Overview

This is a full-stack MERN authentication system built with React, Node.js, Express, and MongoDB, designed to provide secure user registration and login functionality. The system implements industry-standard practices including JWT-based authentication, password hashing using bcrypt, and middleware-based route protection. This project serves as a foundational task for mastering MERN stack fundamentals and building secure web applications.

# Key Features

✅ User Registration: Allows new users to create an account with validation for required fields.

✅ User Login: Authenticates users using email and password.

✅ Secure Password Storage: Uses bcrypt to hash passwords before storing them in MongoDB.

✅ JWT Authentication: Generates and validates JWT tokens to manage user sessions securely.

✅ Protected Routes: Middleware (authMiddleware) ensures only authenticated users can access private endpoints.

✅ MongoDB Integration: Stores and retrieves user data efficiently using Mongoose.

✅ Error Handling & Validation: Handles incorrect credentials, duplicate registrations, and missing fields gracefully.

# Tech Stack

* Frontend: React.js, Axios, React Router

* Backend: Node.js, Express.js, MongoDB, Mongoose

* Security: JWT, bcrypt, environment variables (.env) for sensitive data

# Project Workflow

# Frontend (React)

* Users can sign up and login through responsive forms.

* JWT token is stored in localStorage after login for session management.

* Protected routes check for a valid token before rendering user-specific pages.

# Backend (Node.js & Express)

* User data is stored in MongoDB with hashed passwords.

* JWT tokens are generated upon successful login and verified in authMiddleware.

# Routes:

* POST /api/users/register – Register a new user

* POST /api/users/login – Authenticate a user

* GET /api/users/me – Get logged-in user details (protected route)

# Authentication Flow

* Registration → Password hashing → Save user in DB → Login → JWT issued → Access protected routes
