import { createContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [role, setRole] = useState(localStorage.getItem("role") || "user");

  // 🟢 Sync changes to localStorage
  useEffect(() => {
    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
    }
  }, [token, role, user]);

  // 🟢 Login function - Updates all state
  const login = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
    setRole(userData.role); // Ensure role is correctly assigned
  };

  // 🟢 Logout function - Clears everything
  const logout = () => {
    setToken(null);
    setUser(null);
    setRole("user");
    localStorage.clear(); // Completely clear auth-related data
  };

  return (
    <AuthContext.Provider value={{ token, user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
