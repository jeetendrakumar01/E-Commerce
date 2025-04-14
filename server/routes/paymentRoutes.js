const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Razorpay = require('razorpay');
const config = require('../config/DataConnect');

const razorpayInstance = new Razorpay({
  key_id: config.RAZORPAY_CONFIG.key_id,
  key_secret: config.RAZORPAY_CONFIG.key_secret
});


router.post('/api/payment/order', auth, async (req, res) => {
  const { amount, currency } = req.body;
  const options = {
    amount: amount,
    currency: currency || "INR",
    receipt: `receipt_order_${Date.now()}`,
    payment_capture: 1
  };

  try {
    const order = await razorpayInstance.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Razorpay order error:", error);
    res.status(500).json({ message: "Error creating Razorpay order." });
  }
});

module.exports = router;
