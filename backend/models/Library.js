const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema(
  {
    name: String,
    state: String,
    district: String,
    city: String,
    address: String,
    mobile: String,
    totalSeats: Number,
    photo: String,

    slot1Price: Number,
    slot2Price: Number,
    slot3Price: Number,
    slot4Price: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Library",
  librarySchema
);