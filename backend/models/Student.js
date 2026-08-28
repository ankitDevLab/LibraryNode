const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: false,
      default: "",
    },
    college: {
      type: String,
    },
    course: {
      type: String,
    },
    photo: {
      type: String,
      default: "",
    },
    examPreferences: {
      banking: {
        domain: { type: String, default: "" },
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Student",
  studentSchema
);