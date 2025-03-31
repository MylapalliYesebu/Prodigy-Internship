const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register User
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const user = await User.create({ name, email, password, role });
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Login User
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user);
        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Logout User (Blacklist Token)
let blacklistedTokens = [];
const logout = (req, res) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (token) blacklistedTokens.push(token);
    res.json({ message: "Logout successful" });
};

// Admin Dashboard (Protected Route)
const getAdminDashboard = (req, res) => {
    res.json({ message: "Welcome, Admin! This is a restricted route." });
};

module.exports = { register, login, logout, getAdminDashboard };
