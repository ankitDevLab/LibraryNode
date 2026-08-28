const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Student = require("../models/Student");
const Booking = require("../models/Booking");
const Attendance = require("../models/Attendance");
const QuizHistory = require("../models/QuizHistory");

// Create Student
router.post("/", async (req, res) => {
  try {
    const student = await Student.create(req.body);

    res.status(201).json({
      success: true,
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get All Students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();

    res.json({
      success: true,
      students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Student Login
router.post("/login", async (req, res) => {
  try {
    const { mobile } = req.body;

    const student = await Student.findOne({
      mobile,
    });

    if (!student) {
      return res.status(400).json({
        success: false,
        message: "Student not registered. Please check your mobile number or register.",
      });
    }

    res.json({
      success: true,
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get Single Student
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID.",
      });
    }

    const student = await Student.findById(req.params.id);

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Update Student Profile
router.put("/:id", async (req, res) => {
  try {
    const { name, email, college, course, examPreferences } = req.body;

    const updateData = { name, email, college, course };
    if (examPreferences) {
      updateData.examPreferences = examPreferences;
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get Exam Preferences
router.get("/:id/exam-preferences", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID.",
      });
    }

    const student = await Student.findById(req.params.id).select("examPreferences");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.json({
      success: true,
      examPreferences: student.examPreferences || {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Update Exam Preferences
router.put("/:id/exam-preferences", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID.",
      });
    }

    const { banking } = req.body;

    const updateData = {};
    if (banking && banking.domain) {
      updateData["examPreferences.banking.domain"] = banking.domain;
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.json({
      success: true,
      examPreferences: student.examPreferences,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// DELETE Student Account
router.delete("/:id", async (req, res) => {
  try {
    const { mobile, confirmation } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID.",
      });
    }

    if (confirmation !== "DELETE") {
      return res.status(400).json({
        success: false,
        message: "Confirmation phrase must be exactly 'DELETE'.",
      });
    }

    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    // Verify ownership via mobile number check
    if (student.mobile !== mobile) {
      return res.status(403).json({
        success: false,
        message: "Mobile number mismatch. Cannot delete another user's account.",
      });
    }

    // Cascade deletions
    console.log(`[STUDENT DELETE] Starting cascade delete for student: ${student.name} (${student._id})`);
    
    // 1. Delete Bookings
    const bookingRes = await Booking.deleteMany({ studentId: student._id });
    console.log(`[STUDENT DELETE] Deleted bookings count: ${bookingRes.deletedCount}`);

    // 2. Delete Attendance
    const attendanceRes = await Attendance.deleteMany({ studentId: student._id });
    console.log(`[STUDENT DELETE] Deleted attendance count: ${attendanceRes.deletedCount}`);

    // 3. Delete Quiz History
    const quizRes = await QuizHistory.deleteMany({ student: student._id });
    console.log(`[STUDENT DELETE] Deleted quiz history count: ${quizRes.deletedCount}`);

    // 4. Delete Student
    await Student.findByIdAndDelete(student._id);

    return res.status(200).json({
      success: true,
      message: "Student account and all associated data deleted successfully.",
    });
  } catch (error) {
    console.error("❌ [STUDENT DELETE] Error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete student account.",
    });
  }
});

module.exports = router;