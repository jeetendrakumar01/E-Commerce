module.exports = {
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET || "secret123",
  RAZORPAY_CONFIG: {
    key_id: process.env.RAZORPAY_KEY_ID || "rzp_live_1yTwZTB6pydcrl",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "Q2YoO616VUhggrLpPGH4ORBt"
  },
  MONGO_URI: process.env.MONGO_URI || "mongodb+srv://jeetendrakumar5861:j1CLphoDPKFgguhm@cluster00.onnyowz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster00"
};
