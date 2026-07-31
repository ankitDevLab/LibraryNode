const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error("MONGODB_URI is not defined in the .env file.");
    }

    console.time("⏱️  MongoDB Connection Time");
    const conn = await mongoose.connect(mongoURI);
    console.timeEnd("⏱️  MongoDB Connection Time");

    console.log("✅ MongoDB Connected");
    console.log(`📦 Host: ${conn.connection.host}`);
    console.log(`📂 Database: ${conn.connection.name}`);

    // Monitor connection events
    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️  MongoDB Disconnected");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB Connection Error:", err.message);
    });
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);

    process.exit(1);
  }
};

module.exports = connectDB;