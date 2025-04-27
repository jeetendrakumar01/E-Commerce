import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

 const logout = () => {
   localStorage.removeItem('token');
   setIsAuthenticated(false);
 };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};