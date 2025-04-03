const Employee = require("../models/Employee");

// 🟢 Create Employee
exports.createEmployee = async (req, res) => {
  try {
    const { name, email, position, salary, department } = req.body;

    // 🔹 Validate Input
    if (!name || !email || !position || !salary || !department) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const employee = new Employee({ name, email, position, salary, department });
    await employee.save();

    res.status(201).json({ message: "Employee added successfully", employee });
  } catch (error) {
    console.error("Create Employee Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🟢 Get All Employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json({ employees, total: employees.length });
  } catch (error) {
    console.error("Get Employees Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🟢 Get Employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) return res.status(404).json({ message: "Employee not found" });

    res.json(employee);
  } catch (error) {
    console.error("Get Employee by ID Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🟢 Update Employee
exports.updateEmployee = async (req, res) => {
  try {
    const { name, email, position, salary, department } = req.body;

    // 🔹 Validate Input
    if (!name || !email || !position || !salary || !department) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!employee) return res.status(404).json({ message: "Employee not found" });

    res.json({ message: "Employee updated successfully", employee });
  } catch (error) {
    console.error("Update Employee Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🟢 Delete Employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) return res.status(404).json({ message: "Employee not found" });

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Delete Employee Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
