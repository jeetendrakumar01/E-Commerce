import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    title: "Apple iPhone 15 Pro Max (512 GB) - White Titanium",
    description:
      "FORGED IN TITANIUM — iPhone 15 Pro Max has a strong and light aerospace-grade titanium design with a textured matte-glass back. ",
    price: 16000,
    image: "https://m.media-amazon.com/images/I/81c50PU+lpL._SL1500_.jpg",
  },
  
  {
    id: 1,
    title: "OnePlus Nord CE4 Lite 5G ",
    description:
      "5500 mAh Battery & Reverse Charging: Ditch the power bank and press play all day with Nord CE4 Lite’s gigantic 5,500 mAh battery. You’ll even have enough juice to charge up your buddy’s phone with reverse wired charging",
    price: 16000,
    image: "https://m.media-amazon.com/images/I/51Y-8Iwvx2L._SX679_.jpg",
  },

  {
    id: 1,
    title: "iPhone 16 Pro 128 GB: 5G Mobile Phone",
    description:
      "STUNNING TITANIUM DESIGN — iPhone 16 Pro has a strong and light titanium design with a larger 15.93 cm (6.3″) Super Retina XDR display. It’s remarkably durable with the latest-generation Ceramic Shield material that’s 2x tougher than any smartphone glass.",
    price: 112000,
    image: "https://m.media-amazon.com/images/I/61E-KWTh5GL._SX679_.jpg",
  },
  {
    id: 1,
    title: "Apple iPhone 15 Pro Max (512 GB) - White Titanium",
    description:
      "FORGED IN TITANIUM — iPhone 15 Pro Max has a strong and light aerospace-grade titanium design with a textured matte-glass back. ",
    price: 16000,
    image: "https://m.media-amazon.com/images/I/81c50PU+lpL._SL1500_.jpg",
  },
  {
    id: 1,
    title: "Apple iPhone 15 Pro Max (512 GB) - White Titanium",
    description:
      "FORGED IN TITANIUM — iPhone 15 Pro Max has a strong and light aerospace-grade titanium design with a textured matte-glass back. ",
    price: 16000,
    image: "https://m.media-amazon.com/images/I/81c50PU+lpL._SL1500_.jpg",
  },
  {
    id: 1,
    title: "Apple iPhone 15 Pro Max (512 GB) - White Titanium",
    description:
      "FORGED IN TITANIUM — iPhone 15 Pro Max has a strong and light aerospace-grade titanium design with a textured matte-glass back. ",
    price: 16000,
    image: "https://m.media-amazon.com/images/I/81c50PU+lpL._SL1500_.jpg",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const ProductList = () => {
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const foundIndex = cart.findIndex((item) => item.id === product.id);
    if (foundIndex >= 0) {
      cart[foundIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Product added to cart", cart);
    navigate("/cart");
  };

  return (
    <motion.section
      className="container mx-auto px-4 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Featured Collections
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={cardVariants}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {product.title}
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold text-indigo-600">
                  ${product.price.toFixed(2)}
                </span>
                <button
                  className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition-colors"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default ProductList;
