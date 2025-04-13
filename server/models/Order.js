// server/models/Order.js

const mongoose = require("mongoose");

// Define individual order item schema.
const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
});

// Define the order schema.
const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    totalPrice: { type: Number, required: true },
    status: { type: String, default: "Pending" },
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true }
    },
    contactInfo: {
      phone: { type: String, required: true },
      email: { type: String, required: true }
    },
    paymentMethod: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
