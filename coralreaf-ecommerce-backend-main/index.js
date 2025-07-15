/**
 * ============================================================
 * @file        index.js
 * @description Main backend server file for Node.js app.
 *              Connects to MongoDB, sets up Express app,
 *              and mounts modular routes for each feature.
 * ============================================================
 */

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config(); // Separate call
 // Load environment variables
const mongoose = require("mongoose");

// 🌱 Load environment variables from .env file

// 🛣️ Route Imports: Separating concerns via modular routers
const userRoutes = require("./routes/userRoutes");       // Handles user auth & profile
const adminRoutes = require("./routes/adminRoutes");     // Manages roles & permissions
const productRoutes = require("./routes/productRoutes"); // Product CRUD for managers
const cartRoutes = require("./routes/cartRoutes");       // User cart operations
const orderRoutes = require("./routes/orderRoutes");     // Order creation/tracking

// 🚀 Initialize Express application
const app = express();

// 🧾 Middleware: Parse incoming JSON requests
app.use(express.json());

// 🔗 Connect to MongoDB using credentials from .env
console.log("MONGO_URI is:", process.env.MONGO_URI);

mongoose
  .connect("mongodb+srv://coralreaf:Anmol1000@coralreaf.jr9tqo9.mongodb.net/?retryWrites=true&w=majority&appName=coralreaf", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit if DB connection fails
  });

/**
 * ============================================================
 * 🔌 Route Mounting Section
 * Each route group is mounted under its relevant base path.
 * Ensures clean separation of domain logic and scalability.
 * ============================================================
 */
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// 👤 User Routes → Signup, login, profile management
app.use("/api/users", userRoutes); // Example: POST /api/users/register

// 🛡️ Admin Routes → Role creation, role assignments
app.use("/api/admin", adminRoutes); // Example: POST /api/admin/roles

// 📦 Product Routes → Only accessible to productManager roles
app.use("/api/products", productRoutes); // Example: GET /api/products/:id

// 🛒 Cart Routes → User’s shopping cart operations
app.use("/api/cart", cartRoutes); // Example: POST /api/cart/:userId

// 📦 Order Routes → Checkout, viewing orders, deleting them
app.use("/api/orders", orderRoutes); // Example: DELETE /api/orders/:id

// 🌐 Default health check route
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});



// 🚀 Launch the server at given PORT from .env or default 3000
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🧭 Server running at: http://localhost:${PORT}`);
});