import React, { useState } from "react";

const RazorpayPayment = () => {
  const [message, setMessage] = useState("");

  const initiatePayment = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || "https://e-commerce-website-o5k2.onrender.com";

      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token);

      const response = await fetch(`${apiUrl}/api/payment/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ amount: 10000, currency: "INR" }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error("Order creation failed: " + errorText);
      }

      const data = await response.json();

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Your Company Name",
        description: "Test Transaction",
        order_id: data.id,
        handler: function (response) {
          setMessage(
            "Payment Successful, Payment ID: " + response.razorpay_payment_id
          );
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "00000000000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: { color: "#3399cc" },
      };

      if (!window.Razorpay) {
        throw new Error("Razorpay Checkout script not loaded.");
      }

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      setMessage(`Payment failed: ${error.message}. Please try again or contact support.`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Razorpay Payment
      </h2>
      <button
        onClick={initiatePayment}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors w-full"
      >
        Initiate Razorpay Payment
      </button>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default RazorpayPayment;
