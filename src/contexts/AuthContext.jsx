// src/contexts/AuthContext.jsx
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("sqlrunner_user");
    return saved ? JSON.parse(saved) : { username: "Shifa" };
  });

  const login = (username) => {
    const newUser = { username };
    setUser(newUser);
    localStorage.setItem("sqlrunner_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("sqlrunner_user");
    // optional: redirect handled in router
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
