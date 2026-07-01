const mongoose = require("mongoose");

const librarianSchema = new mongoose.Schema({
  ownerName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  libraryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Library",
  },
});

module.exports = mongoose.model(
  "Librarian",
  librarianSchema
);