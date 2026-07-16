const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not set in the environment");
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    // Never log err/process.env.MONGODB_URI directly here — it may
    // contain the DB username/password.
    console.error("❌ MongoDB connection failed:", err.message);
    // Fail fast: without a DB, every route will error anyway, so a
    // clean crash at startup is far easier to diagnose than every
    // request silently 500ing later.
    process.exit(1);
  }
};

module.exports = connectDB;
