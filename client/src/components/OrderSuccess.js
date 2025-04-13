import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md text-center">
        <div className="mb-4">
          <svg
            className="w-24 h-24 text-green-500 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2l4-4"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Placed!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order was placed successfully with
          Cash on Delivery!
        </p>
        <button
          className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors"
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </button>
      </div>
    </motion.div>
  );
};

export default OrderSuccess;
