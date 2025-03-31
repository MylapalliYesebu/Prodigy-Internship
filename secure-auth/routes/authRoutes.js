const express = require("express");
const { register, login, logout, getAdminDashboard } = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.get("/admin", authMiddleware, authorizeRoles("admin"), getAdminDashboard);

module.exports = router;
