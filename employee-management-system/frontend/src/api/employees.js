import axios from "axios";

const API_URL = "http://localhost:5000/api/employees"; // Backend Employee API

// 🟢 Fetch all employees
export const getEmployees = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch employees" };
  }
};

// 🟢 Fetch a single employee by ID
export const getEmployeeById = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch employee details" };
  }
};

// 🟢 Add a new employee (Admin only)
export const addEmployee = async (employeeData, token) => {
  try {
    const response = await axios.post(API_URL, employeeData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to add employee" };
  }
};

// 🟢 Update an employee (Admin only)
export const updateEmployee = async (id, updatedData, token) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update employee" };
  }
};

// 🟢 Delete an employee (Admin only)
export const deleteEmployee = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete employee" };
  }
};
