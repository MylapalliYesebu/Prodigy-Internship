import React, { useEffect, useState } from 'react';
import API from '../../services/api';

function EmployeeForm({ fetchEmployees, editing, setEditing }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    salary: ''
  });

  useEffect(() => {
    if (editing) {
      setForm(editing);
    } else {
      setForm({
        name: '',
        email: '',
        phone: '',
        position: '',
        department: '',
        salary: ''
      });
    }
  }, [editing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await API.put(`/employees/${editing._id}`, form);
        setEditing(null);
      } else {
        await API.post('/employees', form);
      }
      fetchEmployees();
      setForm({
        name: '',
        email: '',
        phone: '',
        position: '',
        department: '',
        salary: ''
      });
    } catch (err) {
      alert('Error submitting form');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
      <input name="position" placeholder="Position" value={form.position} onChange={handleChange} required />
      <input name="department" placeholder="Department" value={form.department} onChange={handleChange} required />
      <input name="salary" placeholder="Salary" type="number" value={form.salary} onChange={handleChange} required />
      <button type="submit">{editing ? "Update" : "Add"} Employee</button>
      {editing && <button onClick={() => setEditing(null)}>Cancel</button>}
    </form>
  );
}

export default EmployeeForm;
