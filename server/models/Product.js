// server/models/Product.js

const mongoose = require("mongoose");

// Define the product schema.
const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Name of the product.
    description: { type: String }, // Product description.
    price: { type: Number, required: true }, // Product price.
    image: { type: String, default: "" }, // URL for product image.
  },
  { timestamps: true } // Automatically add createdAt & updatedAt.
);

module.exports = mongoose.model("Product", productSchema);
