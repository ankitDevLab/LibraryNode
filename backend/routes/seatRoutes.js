const express = require("express");
const router = express.Router();
const Seat = require("../models/Seat");
const asyncHandler = require("../utils/asyncHandler");

// Fields a client is allowed to update on a seat. Anything else in
// req.body (e.g. libraryId, seatNumber) is ignored to prevent
// mass-assignment.
const UPDATABLE_FIELDS = ["status", "studentId", "floor", "plans"];

// Create Seat
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const seat = await Seat.create(req.body);

    res.status(201).json({
      success: true,
      seat,
    });
  })
);

// Get Seats of One Library
router.get(
  "/:libraryId",
  asyncHandler(async (req, res) => {
    const seats = await Seat.find({
      libraryId: req.params.libraryId,
    }).sort({ seatNumber: 1 });

    res.json({
      success: true,
      seats,
    });
  })
);

// Update Seat Status
router.patch(
  "/:seatId",
  asyncHandler(async (req, res) => {
    const updates = {};
    for (const field of UPDATABLE_FIELDS) {
      if (field in req.body) updates[field] = req.body[field];
    }

    const seat = await Seat.findByIdAndUpdate(req.params.seatId, updates, {
      new: true,
    });

    if (!seat) {
      return res.status(404).json({
        success: false,
        message: "Seat not found",
      });
    }

    res.json({
      success: true,
      seat,
    });
  })
);

module.exports = router;
