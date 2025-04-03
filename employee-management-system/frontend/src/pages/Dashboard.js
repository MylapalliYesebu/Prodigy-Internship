import { useEffect, useState, useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  // 🔹 Fetch employees from API
  const fetchEmployees = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/api/employees", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        setEmployees(data);
      } else {
        console.error("Error fetching employees:", data.message);
      }
    } catch (error) {
      console.error("Server error:", error);
    }
  }, [token]);

  // 🔹 Redirect to login if not authenticated
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchEmployees();
    }
  }, [token, navigate, fetchEmployees]);

  return (
    <div>
      <h1>Dashboard</h1>
      {user && (
        <div>
          <p>Welcome, {user.name}!</p>
          <p>Role: {user.role}</p>
        </div>
      )}

      <h2>Employee List</h2>
      {employees.length > 0 ? (
        <ul>
          {employees.map((employee) => (
            <li key={employee._id}>
              {employee.name} - {employee.position}
            </li>
          ))}
        </ul>
      ) : (
        <p>No employees found.</p>
      )}
    </div>
  );
};

export default Dashboard;
