import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Auth from "./components/Auth";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import CheckoutDetails from "./components/CheckoutDetails";
import Payment from "./components/Payment";
import RazorpayPayment from "./components/RazorpayPayment";
import OrderSuccess from "./components/OrderSuccess";
import Footer from "./components/Footer";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        {token && <Hero />}
        <main className="flex-grow">
          <Routes>
            <Route
              path="/auth"
              element={
                <Auth
                  onLogin={(newToken) => {
                    setToken(newToken);
                    localStorage.setItem("token", newToken);
                  }}
                />
              }
            />
            <Route
              path="/products"
              element={token ? <ProductList /> : <Navigate to="/auth" />}
            />
            <Route
              path="/cart"
              element={token ? <Cart /> : <Navigate to="/auth" />}
            />

            <Route
              path="/checkout"
              element={token ? <CheckoutDetails /> : <Navigate to="/auth" />}
            />
            <Route
              path="/payment"
              element={token ? <Payment /> : <Navigate to="/auth" />}
            />
            <Route
              path="/payment/razorpay"
              element={token ? <RazorpayPayment /> : <Navigate to="/auth" />}
            />
            <Route
              path="/order-success"
              element={token ? <OrderSuccess /> : <Navigate to="/auth" />}
            />
            <Route
              path="*"
              element={<Navigate to={token ? "/products" : "/auth"} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
