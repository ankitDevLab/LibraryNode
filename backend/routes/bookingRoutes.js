const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");
const Seat = require("../models/Seat");

// =========================
// Create Booking
// =========================
router.post("/", async (req, res) => {
  try {
    console.log("🔥 POST /api/bookings HIT");
    console.log(req.body);

    // Create booking
    const booking = await Booking.create({
      ...req.body,
      status: "Pending",
    });

    console.log("Booking Saved:");
    console.log(booking);

    // Update seat status
    const seat = await Seat.findOneAndUpdate(
      {
        libraryId: req.body.libraryId,
        seatNumber: req.body.seatNumber,
      },
      {
        status: "pending",
        studentId: req.body.studentId,
      },
      { new: true }
    );

    console.log("Seat Updated:");
    console.log(seat);

    res.status(201).json({
      success: true,
      booking,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// =========================
// Get All Bookings
// =========================
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("studentId");

    res.json({
      success: true,
      bookings,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// =========================
// Approve Booking
// =========================
router.patch("/:id/approve", async (req, res) => {
  try {

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status: "Approved",
      },
      {
        new: true,
      }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    await Seat.findOneAndUpdate(
      {
        libraryId: booking.libraryId,
        seatNumber: booking.seatNumber,
      },
      {
        status: "booked",
      }
    );

    res.json({
      success: true,
      booking,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// =========================
// Reject Booking
// =========================
router.patch("/:id/reject", async (req, res) => {
  try {

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status: "Rejected",
      },
      {
        new: true,
      }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    await Seat.findOneAndUpdate(
      {
        libraryId: booking.libraryId,
        seatNumber: booking.seatNumber,
      },
      {
        status: "available",
        studentId: null,
      }
    );

    res.json({
      success: true,
      booking,
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