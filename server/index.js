const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Razorpay = require("razorpay");
const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "secret123";
const cors = require("cors");

const Product = require("./models/Product");
const User = require("./models/User");
const Cart = require("./models/Cart");
const Order = require("./models/Order");

const auth = require("./middleware/auth");

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_live_1yTwZTB6pydcrl",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "Q2YoO616VUhggrLpPGH4ORBt",
});

app.use(cors());

app.use(express.json());

mongoose
  .connect(
    process.env.MONGO_URI ||
      "mongodb+srv://jeetendrakumar5861:j1CLphoDPKFgguhm@cluster00.onnyowz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster00",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected!"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.get("/api/status", (req, res) => {
  res.json({ message: "Server is running!" });
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields." });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User with this email already exists." });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user." });
  }
});

// POST /api/auth/login - Log in an existing user.
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password." });
  }
  try {
    // Search for the user.
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials." });
    // Compare the provided password.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials." });
    // Generate JWT token.
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in." });
  }
});

// GET /api/cart - Fetch the user's cart.
app.get("/api/cart", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product"
    );
    res.json(cart || { user: req.user.id, items: [] });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart." });
  }
});

// POST /api/cart - Add or update an item in the cart.
app.post("/api/cart", auth, async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      // If no cart exists, create a new one.
      cart = new Cart({ user: req.user.id, items: [] });
    }
    // Check if the product is already in the cart.
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (itemIndex > -1) {
      // Increase quantity if it exists.
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Otherwise, add the new item.
      cart.items.push({ product: productId, quantity });
    }
    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: "Error updating cart." });
  }
});

// DELETE /api/cart/:itemId - Remove a product from the cart.
app.delete("/api/cart/:itemId", auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found." });
    // Filter out the item to be removed.
    cart.items = cart.items.filter(
      (item) => item._id.toString() !== req.params.itemId
    );
    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: "Error removing item from cart." });
  }
});

// POST /api/orders - Place an order.
app.post("/api/orders", auth, async (req, res) => {
  try {
    // Get the user's cart.
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product"
    );
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty." });
    }
    // Get additional order details from the request body
    const { shippingAddress, contactInfo, paymentMethod } = req.body;

    // Calculate total price.
    let totalPrice = 0;
    cart.items.forEach((item) => {
      totalPrice += item.product.price * item.quantity;
    });
    // Create a new order.
    const order = new Order({
      user: req.user.id,
      items: cart.items,
      totalPrice,
      shippingAddress,
      contactInfo,
      paymentMethod
    });
    const savedOrder = await order.save();
    // Clear the cart after order placement.
    cart.items = [];
    await cart.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error placing order." });
  }
});

// POST /api/razorpay/order - Create a new Razorpay order.
app.post("/api/razorpay/order", auth, async (req, res) => {
  const { amount, currency } = req.body;
  const options = {
    amount: amount,
    currency: currency || "INR",
    receipt: `receipt_order_${Date.now()}`,
    payment_capture: 1, // Auto-capture payment on success.
  };
  try {
    const order = await razorpayInstance.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Razorpay order error:", error);
    res.status(500).json({ message: "Error creating Razorpay order." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
