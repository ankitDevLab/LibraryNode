const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    slotId: {
      type: String,
      required: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false }
);

const librarySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    district: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
      match: [/^[6-9]\d{9}$/, "Invalid mobile number"],
    },

    totalSeats: {
      type: Number,
      required: true,
      min: 1,
    },

    photos: {
      type: [String],
      default: [],
    },

    amenities: {
      type: [String],
      default: [],
    },

    openingTime: {
      type: String,
      default: "06:00",
    },

    closingTime: {
      type: String,
      default: "22:00",
    },

    slots: {
      type: [slotSchema],
      validate: {
        validator: (slots) => slots.length > 0,
        message: "At least one slot is required",
      },
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

librarySchema.index({
  name: 1,
  city: 1,
});

module.exports = mongoose.model("Library", librarySchema);