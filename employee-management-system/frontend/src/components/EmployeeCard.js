import React from "react";

const EmployeeCard = ({ employee, onDelete }) => {
  return (
    <div style={styles.card}>
      <h3>{employee.name}</h3>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Position:</strong> {employee.position}</p>
      {onDelete && (
        <button style={styles.deleteButton} onClick={() => onDelete(employee._id)}>
          Delete
        </button>
      )}
    </div>
  );
};

// 🔹 Inline styles for the card
const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    margin: "10px",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "300px",
    background: "#f9f9f9",
  },
  deleteButton: {
    marginTop: "10px",
    padding: "8px",
    background: "#ff4d4d",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  }
};

export default EmployeeCard;
