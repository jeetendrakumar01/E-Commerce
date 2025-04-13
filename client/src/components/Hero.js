import React from "react";
import { motion } from "framer-motion";

const Hero = () => (
  <motion.section
    className="bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-600 text-white py-20"
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-5xl font-extrabold mb-4">Discover Exclusive Deals</h2>
      <p className="text-xl">
        Premium products curated for your modern lifestyle.
      </p>
    </div>
  </motion.section>
);

export default Hero;
