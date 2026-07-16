const express = require("express");
const router = express.Router();

const Student = require("../models/Student");
const asyncHandler = require("../utils/asyncHandler");

// Create Student
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const student = await Student.create(req.body);

    res.status(201).json({
      success: true,
      student,
    });
  })
);

// Get All Students
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const students = await Student.find();

    res.json({
      success: true,
      students,
    });
  })
);

// Student Login
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { mobile } = req.body;

    const student = await Student.findOne({ mobile });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.json({
      success: true,
      student,
    });
  })
);

module.exports = router;
