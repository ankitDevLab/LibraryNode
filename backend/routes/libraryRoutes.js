const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Library = require("../models/Library");
const Seat = require("../models/Seat");

// =====================================
// CREATE LIBRARY
// =====================================
router.post("/", async (req, res) => {
  const startTime = Date.now();
  console.log("\n📥 [LIBRARY CREATE] Request received");
  console.log("[LIBRARY CREATE] Body:", JSON.stringify(req.body, null, 2));
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
      console.log("❌ [LIBRARY CREATE] Validation failed - missing fields");
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
      console.log("❌ [LIBRARY CREATE] Invalid mobile number:", mobile);
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

    console.time("[LIBRARY CREATE] DB findExisting");
    const existingLibrary = await Library.findOne({
      name,
      city,
    }).session(session);
    console.timeEnd("[LIBRARY CREATE] DB findExisting");

    if (existingLibrary) {
      await session.abortTransaction();
      console.log("❌ [LIBRARY CREATE] Library already exists in this city");
      return res.status(409).json({
        success: false,
        message: "Library already exists in this city.",
      });
    }

    // Build slots array from the 4 slot prices
    const slotDefinitions = [
      { slotId: "slot1", name: "Morning",   startTime: "06:00 AM", endTime: "11:00 AM", price: Number(slot1Price) || 0 },
      { slotId: "slot2", name: "Afternoon", startTime: "11:00 AM", endTime: "04:00 PM", price: Number(slot2Price) || 0 },
      { slotId: "slot3", name: "Evening",   startTime: "04:00 PM", endTime: "09:00 PM", price: Number(slot3Price) || 0 },
      { slotId: "slot4", name: "Night",     startTime: "09:00 PM", endTime: "06:00 AM", price: Number(slot4Price) || 0 },
    ];

    // Only include slots that have a price > 0
    const slots = slotDefinitions.filter((s) => s.price > 0);

    if (slots.length === 0) {
      await session.abortTransaction();
      console.log("❌ [LIBRARY CREATE] No slots with price > 0");
      return res.status(400).json({
        success: false,
        message: "Please set a price for at least one time slot.",
      });
    }

    console.time("[LIBRARY CREATE] DB create library");
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
          photos: photo ? [photo] : [],
          slots,
        },
      ],
      { session }
    );
    console.timeEnd("[LIBRARY CREATE] DB create library");

    const seats = [];

    for (let i = 1; i <= totalSeats; i++) {
      seats.push({
        libraryId: library[0]._id,
        seatNumber: i,
      });
    }

    console.time("[LIBRARY CREATE] DB insert seats");
    await Seat.insertMany(seats, { session });
    console.timeEnd("[LIBRARY CREATE] DB insert seats");

    console.time("[LIBRARY CREATE] DB commit");
    await session.commitTransaction();
    console.timeEnd("[LIBRARY CREATE] DB commit");

    console.log(`✅ [LIBRARY CREATE] Completed in ${Date.now() - startTime}ms`);
    return res.status(201).json({
      success: true,
      message: "Library created successfully.",
      library: library[0],
    });
  } catch (error) {
    await session.abortTransaction();

    console.error(`❌ [LIBRARY CREATE] Failed after ${Date.now() - startTime}ms`);
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
// GET LIBRARIES WITH OWNER NAMES
// =====================================
router.get("/with-owners", async (req, res) => {
  try {
    const Librarian = require("../models/Librarian");

    const libraries = await Library.find().sort({
      createdAt: -1,
    });

    const librarians = await Librarian.find().select("ownerName libraryId");

    const libraryMap = {};
    librarians.forEach((lib) => {
      libraryMap[String(lib.libraryId)] = lib.ownerName;
    });

    const result = libraries.map((library) => ({
      ...library.toObject(),
      ownerName: libraryMap[String(library._id)] || "Unknown",
    }));

    return res.status(200).json({
      success: true,
      count: result.length,
      libraries: result,
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