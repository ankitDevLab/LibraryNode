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

    // Update seat slot availability status
    const slotId = String(req.body.slotId);
    const seat = await Seat.findOne({
      libraryId: req.body.libraryId,
      seatNumber: req.body.seatNumber,
    });

    if (seat) {
      const existingEntry = seat.slotAvailability.find(
        (s) => String(s.slotId) === slotId
      );

      if (existingEntry) {
        await Seat.updateOne(
          {
            libraryId: req.body.libraryId,
            seatNumber: req.body.seatNumber,
            "slotAvailability.slotId": slotId,
          },
          {
            $set: { "slotAvailability.$.status": "pending" },
          }
        );
      } else {
        await Seat.updateOne(
          {
            libraryId: req.body.libraryId,
            seatNumber: req.body.seatNumber,
          },
          {
            $push: {
              slotAvailability: {
                slotId,
                status: "pending",
              },
            },
          }
        );
      }
    }

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
    const { libraryId, studentId } = req.query;
    const filter = {};
    if (libraryId) {
      filter.libraryId = libraryId;
    }
    if (studentId) {
      filter.studentId = studentId;
    }

    const bookings = await Booking.find(filter)
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

    const slotId = String(booking.slotId);
    await Seat.updateOne(
      {
        libraryId: booking.libraryId,
        seatNumber: booking.seatNumber,
        "slotAvailability.slotId": slotId,
      },
      {
        $set: { "slotAvailability.$.status": "booked" },
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

    const slotId = String(booking.slotId);
    await Seat.updateOne(
      {
        libraryId: booking.libraryId,
        seatNumber: booking.seatNumber,
        "slotAvailability.slotId": slotId,
      },
      {
        $set: { "slotAvailability.$.status": "available" },
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