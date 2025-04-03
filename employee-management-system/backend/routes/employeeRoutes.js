const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// GET: Fetch all employees (Protected: Admin & Manager)
router.get("/", protect, async (req, res) => {
  try {
    if (!req.user || (!req.user.role || (req.user.role !== "admin" && req.user.role !== "manager"))) {
      return res.status(403).json({ message: "Access denied: Admins and Managers only" });
    }

    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});


// GET: Fetch a single employee by ID (Protected)
router.get("/:id", protect, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// POST: Add a new employee (Admin only)
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const { name, email, position } = req.body;

    if (!name || !email || !position) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Employee with this email already exists" });
    }

    const newEmployee = new Employee({ name, email, position });
    await newEmployee.save();
    res.status(201).json({ message: "Employee added successfully", employee: newEmployee });
  } catch (error) {
    res.status(500).json({ message: "Failed to add employee", error: error.message });
  }
});

// PUT: Update an employee (Admin only)
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const { name, email, position } = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, email, position },
      { new: true, runValidators: true } // Ensure validation rules apply
    );

    if (!updatedEmployee) return res.status(404).json({ message: "Employee not found" });

    res.status(200).json({ message: "Employee updated successfully", employee: updatedEmployee });
  } catch (error) {
    res.status(500).json({ message: "Failed to update employee", error: error.message });
  }
});

// DELETE: Remove an employee (Admin only)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    await Employee.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete employee", error: error.message });
  }
});

module.exports = router;
