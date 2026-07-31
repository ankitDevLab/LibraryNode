require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const librarianRoutes = require("./routes/librarianRoutes");
const libraryRoutes = require("./routes/libraryRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const seatRoutes = require("./routes/seatRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const customRequestRoutes = require("./routes/customRequestRoutes");

const app = express();

// ===============================
// Security & Middleware
// ===============================
app.use(helmet());
app.use(compression());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);

app.use(morgan("dev"));

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// ===============================
// Routes
// ===============================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 LibrarySphere Backend Running",
  });
});

app.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "MongoDB Backend Working",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/librarians", librarianRoutes);
app.use("/api/libraries", libraryRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/seats", seatRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/custom-requests", customRequestRoutes);

// ===============================
// 404 Handler
// ===============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ===============================
// Global Error Handler
// ===============================
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ===============================
// Start Server
// ===============================
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server");
    console.error(error.message);
    process.exit(1);
  }
};

startServer();