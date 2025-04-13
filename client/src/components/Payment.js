import React from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();

  const handleCOD = () => {
    navigate("/order-success");
  };

  const handleRazorpay = () => {
    navigate("/payment/razorpay");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">
        Select Payment Method
      </h1>
      <div className="flex flex-col items-center space-y-6">
        <button
          onClick={handleCOD}
          className="w-full max-w-md bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
        >
          Cash on Delivery
        </button>
        <button
          onClick={handleRazorpay}
          className="w-full max-w-md bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors"
        >
          Pay with Razorpay
        </button>
      </div>
    </div>
  );
};

export default Payment;
