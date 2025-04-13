// server/middleware/auth.js

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// Middleware to verify JWT token.
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // Check if the token is provided and correctly formatted.
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied." });
  }
  const token = authHeader.split(" ")[1];
  try {
    // Verify the token and attach the decoded data (user id) to req.user.
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid." });
  }
};

module.exports = auth;
