import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext"; // Import AuthContext
import Login from "./pages/Login";
import Employees from "./pages/Employees";
import Home from "./pages/Home";
import Register from "./pages/Register";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { token, user } = useContext(AuthContext); // Use AuthContext

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "#ff4d4d" }}>
        <h2>Access Denied</h2>
        <p>You must be authorized to view this page.</p>
        <button onClick={() => (window.location.href = "/login")}>Go to Login</button>
      </div>
    );
  }

  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/employees"
        element={
          <PrivateRoute allowedRoles={["admin"]}> {/* 🔹 Restrict Employees page to Admins only */}
            <Employees />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
