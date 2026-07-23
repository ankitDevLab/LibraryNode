const mongoose = require("mongoose");

const slotAvailabilitySchema = new mongoose.Schema(
  {
    slotId: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["available", "pending", "booked"],
      default: "available",
    },
  },
  {
    _id: false,
  }
);

const seatSchema = new mongoose.Schema(
  {
    libraryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Library",
      required: true,
      index: true,
    },

    seatNumber: {
      type: Number,
      required: true,
      min: 1,
    },

    floor: {
      type: String,
      default: "Ground Floor",
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    slotAvailability: {
      type: [slotAvailabilitySchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

seatSchema.index(
  {
    libraryId: 1,
    seatNumber: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("Seat", seatSchema);