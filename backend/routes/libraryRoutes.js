const express = require("express");
const router = express.Router();
const Library = require("../models/Library");
const Seat = require("../models/Seat");
const asyncHandler = require("../utils/asyncHandler");

// Create Library
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const totalSeats = Number(req.body.totalSeats);

    if (!Number.isFinite(totalSeats) || totalSeats <= 0) {
      return res.status(400).json({
        success: false,
        message: "totalSeats must be a positive number",
      });
    }

    const library = await Library.create({ ...req.body, totalSeats });

    const seats = Array.from({ length: totalSeats }, (_, i) => ({
      libraryId: library._id,
      seatNumber: i + 1,
      status: "available",
    }));

    await Seat.insertMany(seats);

    res.status(201).json({
      success: true,
      library,
    });
  })
);

// Get All Libraries
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const libraries = await Library.find();

    res.json({
      success: true,
      libraries,
    });
  })
);

module.exports = router;
