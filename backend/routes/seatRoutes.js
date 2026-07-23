const express = require("express");
const router = express.Router();
const Seat = require("../models/Seat");

// Create Seat
router.post("/", async (req, res) => {
  try {
    const seat = await Seat.create(req.body);

    res.status(201).json({
      success: true,
      seat,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get Seats of One Library
router.get("/:libraryId", async (req, res) => {
  try {
    const seats = await Seat.find({
      libraryId: req.params.libraryId,
    }).sort({ seatNumber: 1 });

    res.json({
      success: true,
      seats,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Update Seat Status
router.patch("/:seatId", async (req, res) => {
  try {
    const seat = await Seat.findByIdAndUpdate(
      req.params.seatId,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      seat,
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