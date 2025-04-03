import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext correctly
import axios from "axios";

const Employees = () => {
  const { token, role } = useContext(AuthContext); // Get role from AuthContext
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        console.log("✅ Employees Component Loaded");

        if (!token) {
          console.log("🚨 No token found. Redirecting to login.");
          alert("Access Denied: Please log in.");
          navigate("/login");
          return;
        }

        console.log("📡 Fetching employees from API...");
        const response = await axios.get("http://localhost:5000/api/employees", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("✅ Employees Fetched:", response.data);
        setEmployees(response.data);
      } catch (error) {
        console.error("❌ Error Fetching Employees:", error.response?.data);

        if (error.response?.status === 401) {
          console.log("🚨 Unauthorized! Redirecting to login.");
          alert("Access Denied: Please log in.");
          navigate("/login");
        } else {
          alert(error.response?.data?.message || "Failed to load employees");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [token, navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEmployees(employees.filter(emp => emp._id !== id));
      alert("Employee deleted successfully!");
    } catch (error) {
      console.error("❌ Error deleting employee:", error.response?.data);
      alert(error.response?.data?.message || "Failed to delete employee");
    }
  };

  return (
    <div>
      <h2>Employee List</h2>

      {/* 🟢 Show "Add Employee" Button Only for Admin */}
      {role === "admin" && (
        <button onClick={() => navigate("/add-employee")}>Add Employee</button>
      )}

      {/* 🔄 Loading State */}
      {loading ? (
        <p>Loading...</p>
      ) : employees.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              {role === "admin" && <th>Actions</th>} {/* 🟢 Show only for Admins */}
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.position}</td>

                {/* 🛠️ Admin Actions */}
                {role === "admin" && (
                  <td>
                    <button onClick={() => navigate(`/edit-employee/${emp._id}`)}>Edit</button>
                    <button onClick={() => handleDelete(emp._id)}>Delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No employees found.</p>
      )}
    </div>
  );
};

export default Employees;
