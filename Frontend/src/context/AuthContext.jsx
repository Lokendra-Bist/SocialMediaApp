import { createContext, useState } from "react";
import { loginUser } from "../services/AuthService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);

      const userData = response.data?.user || response?.user;
      const tokenData = response.data?.token || response?.token;

      if (!tokenData || !userData) {
        throw new Error("Invalid response format from server");
      }

      localStorage.setItem("token", tokenData);
      localStorage.setItem("user", JSON.stringify(userData));

      setToken(tokenData);
      setUser(userData);

      return response;
    } catch (error) {
      console.error("Login failed inside AuthContext:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        token,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
