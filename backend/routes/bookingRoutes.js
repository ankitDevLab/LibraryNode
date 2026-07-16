const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");
const Seat = require("../models/Seat");
const asyncHandler = require("../utils/asyncHandler");

// =========================
// Create Booking
// =========================
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { libraryId, seatNumber, studentId } = req.body;

    const booking = await Booking.create(req.body);

    // Mark the seat as pending while the librarian reviews the booking.
    const seat = await Seat.findOneAndUpdate(
      { libraryId, seatNumber },
      { status: "pending", studentId },
      { new: true }
    );

    res.status(201).json({
      success: true,
      booking,
      seat,
    });
  })
);

// =========================
// Get All Bookings
// =========================
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const bookings = await Booking.find().populate("studentId");

    res.json({
      success: true,
      bookings,
    });
  })
);

// =========================
// Approve Booking
// =========================
router.patch(
  "/:id/approve",
  asyncHandler(async (req, res) => {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "Approved" },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    await Seat.findOneAndUpdate(
      { libraryId: booking.libraryId, seatNumber: booking.seatNumber },
      { status: "booked" }
    );

    res.json({
      success: true,
      booking,
    });
  })
);

// =========================
// Reject Booking
// =========================
router.patch(
  "/:id/reject",
  asyncHandler(async (req, res) => {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "Rejected" },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    await Seat.findOneAndUpdate(
      { libraryId: booking.libraryId, seatNumber: booking.seatNumber },
      { status: "available", studentId: null }
    );

    res.json({
      success: true,
      booking,
    });
  })
);

module.exports = router;
