const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // User's full name.
    email: { type: String, required: true, unique: true }, // Email, must be unique.
    password: { type: String, required: true }, // Hashed password.
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
