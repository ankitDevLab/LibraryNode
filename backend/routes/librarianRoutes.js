const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const Librarian = require("../models/Librarian");
const Library = require("../models/Library");

// =====================================
// TEST ROUTE
// =====================================
router.get("/test", (req, res) => {
  return res.json({
    success: true,
    message: "Librarian Routes Working Successfully 🚀",
  });
});

// =====================================
// REGISTER LIBRARIAN
// =====================================
router.post("/register", async (req, res) => {
  try {
    let { ownerName, email, password, libraryId } = req.body;

    if (!ownerName || !email || !password || !libraryId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    ownerName = ownerName.trim();
    email = email.trim().toLowerCase();

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long.",
      });
    }

    const existingLibrarian = await Librarian.findOne({ email });

    if (existingLibrarian) {
      return res.status(409).json({
        success: false,
        message: "Email already registered.",
      });
    }

    const library = await Library.findById(libraryId);

    if (!library) {
      return res.status(404).json({
        success: false,
        message: "Library not found.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const librarian = await Librarian.create({
      ownerName,
      email,
      password: hashedPassword,
      libraryId,
    });

    return res.status(201).json({
      success: true,
      message: "Librarian registered successfully.",
      librarian: {
        _id: librarian._id,
        ownerName: librarian.ownerName,
        email: librarian.email,
        libraryId: librarian.libraryId,
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

// =====================================
// LOGIN LIBRARIAN
// =====================================
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    email = email.trim().toLowerCase();

    const librarian = await Librarian.findOne({ email }).select("+password");

    if (!librarian) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      librarian.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      {
        id: librarian._id,
        email: librarian.email,
        libraryId: librarian.libraryId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      librarian: {
        _id: librarian._id,
        ownerName: librarian.ownerName,
        email: librarian.email,
        libraryId: librarian.libraryId,
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

// =====================================
// GET ALL LIBRARIANS
// =====================================
router.get("/", async (req, res) => {
  try {
    const librarians = await Librarian.find().select("-password");

    return res.status(200).json({
      success: true,
      count: librarians.length,
      librarians,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
});

module.exports = router;