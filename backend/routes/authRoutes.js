const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

// ===============================
// Register
// ===============================
router.post("/register", async (req, res) => {
  const startTime = Date.now();
  console.log("\n📥 [AUTH REGISTER] Request received");
  try {
    let { name, email, password, role } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required.",
      });
    }

    name = name.trim();
    email = email.trim().toLowerCase();

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long.",
      });
    }

    // Check existing user
    console.time("[AUTH REGISTER] DB findOne");
    const existingUser = await User.findOne({ email });
    console.timeEnd("[AUTH REGISTER] DB findOne");

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered.",
      });
    }

    // Allow only student registration from frontend
      const allowedRole = "student";

    // Hash password
    console.time("[AUTH REGISTER] bcrypt hash");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.timeEnd("[AUTH REGISTER] bcrypt hash");

    // Create user
    console.time("[AUTH REGISTER] DB create");
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: allowedRole,
    });
    console.timeEnd("[AUTH REGISTER] DB create");

    console.log(`✅ [AUTH REGISTER] Completed in ${Date.now() - startTime}ms`);
    return res.status(201).json({
      success: true,
      message: "Registration successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
});

// ===============================
// Login
// ===============================
router.post("/login", async (req, res) => {
  const startTime = Date.now();
  console.log("\n📥 [AUTH LOGIN] Request received");
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    email = email.trim().toLowerCase();

    // Find user
    console.time("[AUTH LOGIN] DB findOne");
    const user = await User.findOne({ email }).select("+password");
    console.timeEnd("[AUTH LOGIN] DB findOne");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Compare password
    console.time("[AUTH LOGIN] bcrypt compare");
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );
    console.timeEnd("[AUTH LOGIN] bcrypt compare");

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Generate JWT
    console.time("[AUTH LOGIN] JWT sign");
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    console.timeEnd("[AUTH LOGIN] JWT sign");

    console.log(`✅ [AUTH LOGIN] Completed in ${Date.now() - startTime}ms`);
    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(`❌ [AUTH LOGIN] Failed after ${Date.now() - startTime}ms`);
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
});

module.exports = router;