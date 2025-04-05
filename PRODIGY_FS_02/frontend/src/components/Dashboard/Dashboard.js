import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import EmployeeForm from './EmployeeForm';

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [editing, setEditing] = useState(null); // Holds employee object for edit
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchEmployees();
    const localUser = JSON.parse(localStorage.getItem('user'));
    setUser(localUser);
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await API.get('/employees');
      setEmployees(res.data);
    } catch (err) {
      alert('Error fetching employees');
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      alert('Error deleting employee');
    }
  };

  return (
    <div>
      <h2>Welcome to Dashboard</h2>

      {user?.role === 'admin' && (
        <>
          <h3>{editing ? "Edit Employee" : "Add New Employee"}</h3>
          <EmployeeForm
            fetchEmployees={fetchEmployees}
            editing={editing}
            setEditing={setEditing}
          />
        </>
      )}

      <h3>Employee List</h3>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th>
            <th>Position</th><th>Department</th><th>Salary</th>
            {user?.role === 'admin' && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>{emp.position}</td>
              <td>{emp.department}</td>
              <td>{emp.salary}</td>
              {user?.role === 'admin' && (
                <td>
                  <button onClick={() => setEditing(emp)}>Edit</button>
                  <button onClick={() => handleDelete(emp._id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => {
        localStorage.clear();
        window.location.href = "/";
      }}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
