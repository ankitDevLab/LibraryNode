const express = require("express");
const router = express.Router();
const Library = require("../models/Library");
const Seat = require("../models/Seat");
// Create Library
router.post("/", async (req, res) => {
  try {
    const library = await Library.create(req.body);

    const seats = [];

    for (
      let i = 1;
      i <= Number(library.totalSeats);
      i++
    ) {
      seats.push({
        libraryId: library._id,
        seatNumber: i,
        status: "available",
      });
    }

    await Seat.insertMany(seats);

    res.status(201).json({
      success: true,
      library,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get All Libraries
router.get("/", async (req, res) => {
  try {
    const libraries = await Library.find();

    res.json({
      success: true,
      libraries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;