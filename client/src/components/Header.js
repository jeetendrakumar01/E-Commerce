import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="bg-gray-900 text-white shadow-lg">
    <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
      <h1 className="text-3xl font-extrabold">E-Commerce</h1>
      <nav className="mt-2 md:mt-0">
        <ul className="flex flex-wrap space-x-6 text-lg font-medium">
          <li>
            <Link to="/" className="hover:text-indigo-400 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="hover:text-indigo-400 transition-colors"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="hover:text-indigo-400 transition-colors"
            >
              Cart
            </Link>
          </li>
          <li>
            <Link
              to="/auth"
              className="hover:text-indigo-400 transition-colors"
            >
              Login/Register
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
