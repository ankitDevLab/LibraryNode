const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Library = require("../models/Library");
const Seat = require("../models/Seat");

// =====================================
// CREATE LIBRARY
// =====================================
router.post("/", async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    let {
      name,
      state,
      district,
      city,
      address,
      mobile,
      totalSeats,
      photo,
      slot1Price,
      slot2Price,
      slot3Price,
      slot4Price,
    } = req.body;

    if (
      !name ||
      !state ||
      !district ||
      !city ||
      !address ||
      !mobile ||
      totalSeats == null
    ) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    name = name.trim();
    state = state.trim();
    district = district.trim();
    city = city.trim();
    address = address.trim();
    mobile = mobile.trim();

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "Invalid mobile number.",
      });
    }

    totalSeats = Number(totalSeats);

    if (isNaN(totalSeats) || totalSeats < 1) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "Total seats must be greater than 0.",
      });
    }

    const existingLibrary = await Library.findOne({
      name,
      city,
    }).session(session);

    if (existingLibrary) {
      await session.abortTransaction();
      return res.status(409).json({
        success: false,
        message: "Library already exists in this city.",
      });
    }

    const library = await Library.create(
      [
        {
          name,
          state,
          district,
          city,
          address,
          mobile,
          totalSeats,
          photo,
          slot1Price,
          slot2Price,
          slot3Price,
          slot4Price,
        },
      ],
      { session }
    );

    const seats = [];

    for (let i = 1; i <= totalSeats; i++) {
      seats.push({
        libraryId: library[0]._id,
        seatNumber: i,
      });
    }

    await Seat.insertMany(seats, { session });

    await session.commitTransaction();

    return res.status(201).json({
      success: true,
      message: "Library created successfully.",
      library: library[0],
    });
  } catch (error) {
    await session.abortTransaction();

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  } finally {
    session.endSession();
  }
});

// =====================================
// GET ALL LIBRARIES
// =====================================
router.get("/", async (req, res) => {
  try {
    const libraries = await Library.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: libraries.length,
      libraries,
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
// GET SINGLE LIBRARY
// =====================================
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid library ID.",
      });
    }

    const library = await Library.findById(req.params.id);

    if (!library) {
      return res.status(404).json({
        success: false,
        message: "Library not found.",
      });
    }

    return res.status(200).json({
      success: true,
      library,
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
// UPDATE LIBRARY
// =====================================
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid library ID.",
      });
    }

    delete req.body.totalSeats;

    const library = await Library.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!library) {
      return res.status(404).json({
        success: false,
        message: "Library not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Library updated successfully.",
      library,
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
// DELETE LIBRARY
// =====================================
router.delete("/:id", async (req, res) => {
  const session = await mongoose.startSession();

  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid library ID.",
      });
    }

    session.startTransaction();

    const library = await Library.findById(req.params.id).session(session);

    if (!library) {
      await session.abortTransaction();

      return res.status(404).json({
        success: false,
        message: "Library not found.",
      });
    }

    await Seat.deleteMany(
      {
        libraryId: library._id,
      },
      { session }
    );

    await Library.deleteOne(
      {
        _id: library._id,
      },
      { session }
    );

    await session.commitTransaction();

    return res.status(200).json({
      success: true,
      message: "Library deleted successfully.",
    });
  } catch (error) {
    await session.abortTransaction();

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  } finally {
    session.endSession();
  }
});

module.exports = router;