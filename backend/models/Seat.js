const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema(
  {
    libraryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Library",
      required: true,
    },

    seatNumber: {
      type: Number,
      required: true,
    },

    floor: String,

    status: {
      type: String,
      enum: ["available", "pending", "booked"],
      default: "available",
    },
    studentId: {
    type: String,
    default: null,
    },

    plans: [
      {
        duration: Number,
        price: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Seat", seatSchema);