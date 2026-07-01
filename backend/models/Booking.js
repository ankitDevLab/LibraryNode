const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    libraryId: {
      type: String,
      required: true,
    },

    libraryName: {
      type: String,
      required: true,
    },

    seatNumber: {
      type: Number,
      required: true,
    },

    slot: {
      type: String,
      required: true,
    },

    planDuration: {
      type: Number,
      default: 1,
    },

    amount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);