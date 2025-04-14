const DataConnect = require('./DataConnect');

module.exports = {
  MONGO_URI: process.env.MONGO_URI || DataConnect.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET || 'secret123',
  RAZORPAY_CONFIG: {
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_live_1yTwZTB6pydcrl',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'Q2YoO616VUhggrLpPGH4ORBt'
  },
  PORT: process.env.PORT || 5000
};
