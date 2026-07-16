const express = require("express");
const router = express.Router();

const Attendance = require("../models/Attendance");
const asyncHandler = require("../utils/asyncHandler");

// Mark Attendance
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const attendance = await Attendance.create(req.body);

    res.status(201).json({
      success: true,
      attendance,
    });
  })
);

// Get All Attendance
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const attendance = await Attendance.find().populate("studentId");

    res.json({
      success: true,
      attendance,
    });
  })
);

module.exports = router;
