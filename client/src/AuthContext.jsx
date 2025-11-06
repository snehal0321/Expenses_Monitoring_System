// AuthContext.js
import { set } from "mongoose";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for stored token on initial load
    const token = localStorage.getItem("jwt_token");
    if (token) {
      setIsAuthenticated(true);
      setUser(token.user);
      // Optionally, decode token to get user info or fetch user data
    }
  }, []);

  const login = async (credentials) => {
    // Make API call to backend

    console.log("Logging in with credentials:", credentials);
    const response = await fetch(
      "https://expenses-monitoring-system-1.onrender.com/api/expenses/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      }
    );
    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("jwt_token", data.token);
      setIsAuthenticated(true);
      setUser(data.user); // Assuming user data is returned
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt_token");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
