const express = require('express');
const router = express.Router();
const {
    createEmployee,
    getEmployees,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employeeController');

const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const { validateEmployee } = require('../middlewares/validators');
const { validationResult } = require('express-validator');


// Public - View all employees
router.get('/', authMiddleware, getEmployees);

// Admin Only - Add, Edit, Delete
router.post('/', authMiddleware, adminMiddleware, validateEmployee, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array()[0].msg });
    next();
  }, createEmployee);
router.put('/:id', authMiddleware, adminMiddleware, updateEmployee);
router.delete('/:id', authMiddleware, adminMiddleware, deleteEmployee);

module.exports = router;


