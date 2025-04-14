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
    title: "iPhone 16 Pro Max 1 TB: 5G Mobile Phone",
    description:
      "STUNNING TITANIUM DESIGN — iPhone 16 Pro Max has a strong and light titanium design with a larger 17.43 cm (6.9″) Super Retina XDR display.",
      price: 16000,
      image: "https://m.media-amazon.com/images/I/51uVytsMySL._SX679_.jpg",
  },
  {
    id: 1,
    title: "iPhone 16 512 GB: 5G Mobile Phone with Camera Control",
    description:
      "BUILT FOR APPLE INTELLIGENCE — Apple Intelligence is the personal intelligence system that helps you write, express yourself and get things done effortlessly. With groundbreaking privacy protections",
      price: 16000,
      image: "https://m.media-amazon.com/images/I/51hUtCMum4L._SL1500_.jpg",
  },
  {
    id: 1,
    title: "LG 34 Inches 21:9 Curved Ultra Wide Monitor, WQHD(3440 x 1440 Pixels)",
    description:
      "BUILT FOR APPLE INTELLIGENCE — Apple Intelligence is the personal intelligence system that helps you write, express yourself and get things done effortlessly. With groundbreaking privacy protections",
      price: 28299,
      image: "https://m.media-amazon.com/images/I/61ANQPyBfZL._SX679_.jpg",
  },{
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
    title: "iPhone 16 Pro Max 1 TB: 5G Mobile Phone",
    description:
      "STUNNING TITANIUM DESIGN — iPhone 16 Pro Max has a strong and light titanium design with a larger 17.43 cm (6.9″) Super Retina XDR display.",
      price: 16000,
      image: "https://m.media-amazon.com/images/I/51uVytsMySL._SX679_.jpg",
  },
  {
    id: 1,
    title: "iPhone 16 512 GB: 5G Mobile Phone with Camera Control",
    description:
      "BUILT FOR APPLE INTELLIGENCE — Apple Intelligence is the personal intelligence system that helps you write, express yourself and get things done effortlessly. With groundbreaking privacy protections",
      price: 16000,
      image: "https://m.media-amazon.com/images/I/51hUtCMum4L._SL1500_.jpg",
  },
  {
    id: 1,
    title: "LG 34 Inches 21:9 Curved Ultra Wide Monitor, WQHD(3440 x 1440 Pixels)",
    description:
      "BUILT FOR APPLE INTELLIGENCE — Apple Intelligence is the personal intelligence system that helps you write, express yourself and get things done effortlessly. With groundbreaking privacy protections",
      price: 28299,
      image: "https://m.media-amazon.com/images/I/61ANQPyBfZL._SX679_.jpg",
  }
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
      className="container mx-auto px-4 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Featured Products
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={cardVariants}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-200"
          >
            <div className="p-3">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-contain mx-auto"
              />
            </div>
            <div className="p-3 pt-0">
              <h3 className="text-sm font-medium text-gray-900 line-clamp-2 h-10 mb-1">
                {product.title}
              </h3>
              <div className="flex items-center justify-between mt-3">
                <span className="text-base font-bold text-indigo-600">
                  ${product.price.toFixed(2)}
                </span>
                <button
                  className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700 transition-colors"
                  onClick={() => handleAddToCart(product)}
                >
                  Add
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
