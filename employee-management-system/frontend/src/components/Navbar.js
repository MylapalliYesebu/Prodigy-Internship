import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}> {/* ✅ Applied navbar styles */}
      <ul style={styles.navList}> {/* ✅ Applied navList styles */}
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/employees" style={styles.link}>Employees</Link></li>
        <li><Link to="/login" style={styles.link}>Login</Link></li>
        <li><Link to="/register" style={styles.link}>Register</Link></li>
      </ul>
    </nav>
  );
};

// 🔹 Inline styles
const styles = {
  navbar: {
    background: "#333",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "center",
  },
  navList: {
    listStyle: "none",
    display: "flex",
    gap: "15px",
    margin: 0,
    padding: 0,
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
  },
};

export default Navbar;
