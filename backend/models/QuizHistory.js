const mongoose = require("mongoose");

const quizHistorySchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    exam: {
      type: String,
      required: true,
      lowercase: true,
    },
    domain: {
      type: String,
      default: "",
    },
    numQuestions: {
      type: Number,
      required: true,
    },
    level: {
      type: String,
      required: true,
      lowercase: true,
    },
    score: {
      type: Number,
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("QuizHistory", quizHistorySchema);
