const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4, // force IPv4
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
  console.error("❌ MongoDB Error:", error);
  process.exit(1);
};
  }


module.exports = connectDB;