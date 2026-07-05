const express = require("express");
const router = express.Router();

const Librarian = require("../models/Librarian");

// ============================
// TEST ROUTE
// ============================
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Librarian Routes Working Successfully 🚀",
  });
});

// ============================
// REGISTER LIBRARIAN
// ============================
router.post("/register", async (req, res) => {
  try {
    const { ownerName, email, password, libraryId } = req.body;

    // Check if email already exists
    const existingLibrarian = await Librarian.findOne({ email });

    if (existingLibrarian) {
      return res.status(400).json({
        success: false,
        message: "Email already registered.",
      });
    }

    const librarian = await Librarian.create({
      ownerName,
      email,
      password,
      libraryId,
    });

    res.status(201).json({
      success: true,
      message: "Librarian registered successfully.",
      librarian,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ============================
// LOGIN LIBRARIAN
// ============================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const librarian = await Librarian.findOne({
      email,
      password,
    });

    if (!librarian) {
      return res.status(401).json({
        success: false,
        message:
          "You are not a valid librarian. Please contact LibrarySphere Administration.",
      });
    }

    res.json({
      success: true,
      message: "Login Successful",
      librarian,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ============================
// GET ALL LIBRARIANS
// ============================
router.get("/", async (req, res) => {
  try {
    const librarians = await Librarian.find();

    res.json({
      success: true,
      librarians,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;