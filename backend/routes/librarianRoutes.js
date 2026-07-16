const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const Librarian = require("../models/Librarian");
const asyncHandler = require("../utils/asyncHandler");

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
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { ownerName, email, password, libraryId } = req.body;

    const existingLibrarian = await Librarian.findOne({ email });

    if (existingLibrarian) {
      return res.status(400).json({
        success: false,
        message: "Email already registered.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const librarian = await Librarian.create({
      ownerName,
      email,
      password: hashedPassword,
      libraryId,
    });

    res.status(201).json({
      success: true,
      message: "Librarian registered successfully.",
      librarian,
    });
  })
);

// ============================
// LOGIN LIBRARIAN
// ============================
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const librarian = await Librarian.findOne({ email });

    if (!librarian) {
      return res.status(401).json({
        success: false,
        message:
          "You are not a valid librarian. Please contact LibrarySphere Administration.",
      });
    }

    const match = await bcrypt.compare(password, librarian.password);

    if (!match) {
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
  })
);

// ============================
// GET ALL LIBRARIANS
// ============================
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const librarians = await Librarian.find();

    res.json({
      success: true,
      librarians,
    });
  })
);

module.exports = router;
