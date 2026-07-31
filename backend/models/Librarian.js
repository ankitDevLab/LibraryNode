const mongoose = require("mongoose");

const librarianSchema = new mongoose.Schema(
  {
    ownerName: {
      type: String,
      required: [true, "Owner name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please enter a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false,
    },

    libraryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Library",
      required: [true, "Library ID is required"],
    },

    photo: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate email

module.exports = mongoose.model(
  "Librarian",
  librarianSchema
);