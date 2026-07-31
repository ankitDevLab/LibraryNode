const express = require("express");
const router = express.Router();

const Attendance = require("../models/Attendance");

// =======================
// Mark Attendance
// =======================
router.post("/", async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);

    res.status(201).json({
      success: true,
      attendance,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// =======================
// Get All Attendance
// =======================
router.get("/", async (req, res) => {
  try {
    const { libraryId } = req.query;
    const filter = {};
    if (libraryId) {
      filter.libraryId = libraryId;
    }

    const attendance = await Attendance.find(filter)
      .populate("studentId");

    res.json({
      success: true,
      attendance,
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