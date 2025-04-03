import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Backend Authentication API

// 🟢 Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};

// 🟢 Login user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data; // Returns token & user info
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

// 🟢 Fetch user details (Optional: If you need to get user data after login)
export const fetchUserData = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch user data" };
  }
};
