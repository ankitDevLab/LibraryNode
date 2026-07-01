const express = require("express");
const router = express.Router();

const Librarian = require("../models/Librarian");

router.post("/register", async (req, res) => {
  try {
    const librarian = await Librarian.create(req.body);    
    res.status(201).json({
      success: true,
      librarian,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

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
        message: "Invalid Credentials",
      });
    }

    res.json({
      success: true,
      librarian,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;