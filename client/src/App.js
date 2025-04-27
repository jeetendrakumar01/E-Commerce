import React, { useState, useEffect, useMemo } from "react";
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
import Profile from "./components/Profile";
import { AuthContext } from "./AuthContext";

function App() {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (newToken) => {
    setToken(newToken);
    setIsAuthenticated(true);
    localStorage.setItem("token", newToken);
  };

  const handleLogout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  const authContextValue = useMemo(
    () => ({
      isAuthenticated,
      login: handleLogin,
      logout: handleLogout,
    }),
    [isAuthenticated]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          {isAuthenticated && <Hero />}
          <main className="flex-grow">
            <Routes>
              <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
              <Route
                path="/products"
                element={isAuthenticated ? <ProductList /> : <Navigate to="/auth" />}
              />
              <Route path="/cart" element={isAuthenticated ? <Cart /> : <Navigate to="/auth" />} />

              <Route path="/checkout" element={isAuthenticated ? <CheckoutDetails /> : <Navigate to="/auth" />} />
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
                path="/profile"
                element={isAuthenticated ? <Profile /> : <Navigate to="/auth" />}
              />
            <Route
              path="*"
              element={<Navigate to={isAuthenticated ? "/products" : "/auth"} />}
            />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
