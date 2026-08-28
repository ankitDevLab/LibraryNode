const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const Librarian = require("../models/Librarian");
const Library = require("../models/Library");
const Seat = require("../models/Seat");
const Booking = require("../models/Booking");
const Attendance = require("../models/Attendance");
const CustomRequest = require("../models/CustomRequest");

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
  const startTime = Date.now();
  console.log("\n📥 [LIBRARIAN REGISTER] Request received");
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

    console.time("[LIBRARIAN REGISTER] DB findOne");
    const existingLibrarian = await Librarian.findOne({ email });
    console.timeEnd("[LIBRARIAN REGISTER] DB findOne");

    if (existingLibrarian) {
      return res.status(409).json({
        success: false,
        message: "Email already registered.",
      });
    }

    console.time("[LIBRARIAN REGISTER] DB findLibrary");
    const library = await Library.findById(libraryId);
    console.timeEnd("[LIBRARIAN REGISTER] DB findLibrary");

    if (!library) {
      return res.status(404).json({
        success: false,
        message: "Library not found.",
      });
    }

    console.time("[LIBRARIAN REGISTER] bcrypt hash");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.timeEnd("[LIBRARIAN REGISTER] bcrypt hash");

    console.time("[LIBRARIAN REGISTER] DB create");
    const librarian = await Librarian.create({
      ownerName,
      email,
      password: hashedPassword,
      libraryId,
    });
    console.timeEnd("[LIBRARIAN REGISTER] DB create");

    console.log(`✅ [LIBRARIAN REGISTER] Completed in ${Date.now() - startTime}ms`);
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
  const startTime = Date.now();
  console.log("\n📥 [LIBRARIAN LOGIN] Request received");
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    email = email.trim().toLowerCase();

    console.time("[LIBRARIAN LOGIN] DB findOne");
    const librarian = await Librarian.findOne({ email }).select("+password");
    console.timeEnd("[LIBRARIAN LOGIN] DB findOne");

    if (!librarian) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    console.time("[LIBRARIAN LOGIN] bcrypt compare");
    const isMatch = await bcrypt.compare(
      password,
      librarian.password
    );
    console.timeEnd("[LIBRARIAN LOGIN] bcrypt compare");

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    console.time("[LIBRARIAN LOGIN] JWT sign");
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
    console.timeEnd("[LIBRARIAN LOGIN] JWT sign");

    console.log(`✅ [LIBRARIAN LOGIN] Completed in ${Date.now() - startTime}ms`);
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
    console.error(`❌ [LIBRARIAN LOGIN] Failed after ${Date.now() - startTime}ms`);
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
});

// =====================================
// GET SINGLE LIBRARIAN
// =====================================
router.get("/:id", async (req, res) => {
  try {
    const librarian = await Librarian.findById(req.params.id).populate("libraryId");
    if (!librarian) {
      return res.status(404).json({
        success: false,
        message: "Librarian not found.",
      });
    }

    return res.status(200).json({
      success: true,
      librarian,
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
// UPDATE LIBRARIAN PROFILE
// =====================================
router.put("/:id", async (req, res) => {
  try {
    const { ownerName, email, photo } = req.body;

    const librarian = await Librarian.findByIdAndUpdate(
      req.params.id,
      { ownerName, email, photo },
      { new: true, runValidators: true }
    ).populate("libraryId");

    if (!librarian) {
      return res.status(404).json({
        success: false,
        message: "Librarian not found.",
      });
    }

    return res.status(200).json({
      success: true,
      librarian,
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
// CHANGE LIBRARIAN PASSWORD
// =====================================
router.put("/:id/change-password", async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password, new password, and confirm password are required.",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirmation password must be the same.",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 8 characters long.",
      });
    }

    const librarian = await Librarian.findById(req.params.id).select("+password");

    if (!librarian) {
      return res.status(404).json({
        success: false,
        message: "Librarian not found.",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, librarian.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Your current password is incorrect.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    librarian.password = hashedPassword;
    await librarian.save();

    return res.status(200).json({
      success: true,
      message: "Your password has been changed successfully.",
    });
  } catch (error) {
    console.error("❌ [LIBRARIAN CHANGE PASSWORD] Error:", error);
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

// DELETE Librarian Account & Library
router.delete("/:id", async (req, res) => {
  try {
    const { password, confirmation } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid librarian ID.",
      });
    }

    if (confirmation !== "DELETE") {
      return res.status(400).json({
        success: false,
        message: "Confirmation phrase must be exactly 'DELETE'.",
      });
    }

    const librarian = await Librarian.findById(req.params.id).select("+password");
    if (!librarian) {
      return res.status(404).json({
        success: false,
        message: "Librarian not found.",
      });
    }

    // Verify ownership via password check
    const isMatch = await bcrypt.compare(password, librarian.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password. Cannot delete account.",
      });
    }

    const libraryId = librarian.libraryId;

    // Check if the library has any active or pending student bookings
    if (libraryId) {
      const activeBookings = await Booking.find({
        libraryId,
        status: { $in: ["Pending", "Approved"] },
      });

      if (activeBookings.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Cannot delete account: Your library currently has active or pending bookings. Please complete or cancel all bookings before deleting your account.",
        });
      }
    }

    console.log(`[LIBRARIAN DELETE] Starting cascade delete for librarian ${librarian.email} and library ${libraryId}`);

    if (libraryId) {
      // 1. Delete Library
      await Library.findByIdAndDelete(libraryId);

      // 2. Delete Seats
      const seatRes = await Seat.deleteMany({ libraryId });
      console.log(`[LIBRARIAN DELETE] Deleted seats count: ${seatRes.deletedCount}`);

      // 3. Delete Bookings (historical bookings)
      const bookingRes = await Booking.deleteMany({ libraryId });
      console.log(`[LIBRARIAN DELETE] Deleted bookings count: ${bookingRes.deletedCount}`);

      // 4. Delete Attendance records
      const attendanceRes = await Attendance.deleteMany({ libraryId: String(libraryId) });
      console.log(`[LIBRARIAN DELETE] Deleted attendance count: ${attendanceRes.deletedCount}`);

      // 5. Delete Custom Requests
      const requestRes = await CustomRequest.deleteMany({ libraryId });
      console.log(`[LIBRARIAN DELETE] Deleted custom requests count: ${requestRes.deletedCount}`);
    }

    // 6. Delete Librarian
    await Librarian.findByIdAndDelete(librarian._id);

    return res.status(200).json({
      success: true,
      message: "Librarian account and all associated library records deleted successfully.",
    });
  } catch (error) {
    console.error("❌ [LIBRARIAN DELETE] Error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete librarian account.",
    });
  }
});

module.exports = router;