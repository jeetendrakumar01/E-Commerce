const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Cart = require('../models/Cart');
const Order = require('../models/Order');

router.post('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty." });
    }

    const { shippingAddress, contactInfo, paymentMethod } = req.body;

    let totalPrice = 0;
    cart.items.forEach(item => {
      totalPrice += item.product.price * item.quantity;
    });

    const order = new Order({
      user: req.user.id,
      items: cart.items,
      totalPrice,
      shippingAddress,
      contactInfo,
      paymentMethod
    });

    const savedOrder = await order.save();
    cart.items = [];
    await cart.save();
    
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error placing order." });
  }
});

module.exports = router;
