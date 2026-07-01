const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://LibrarySphere:Library123@librarysphere.zoxpkqg.mongodb.net/librarysphere?retryWrites=true&w=majority&appName=LibrarySphere"
  )
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ Error:");
    console.error(err);
  });