require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const path = require("path");

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
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
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
// Backend API Routes
// ===============================
app.get("/api/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "MongoDB Backend Working",
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
// Serve Static Frontend & SPA Fallback for React Router
// ===============================
const frontendDistPath = path.resolve(__dirname, "../frontend/dist");

// Serve static frontend assets (CSS, JS, images, sitemap.xml, robots.txt, etc.)
app.use(express.static(frontendDistPath));

// Fallback for non-API GET requests to serve index.html (Express 5 compatible)
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api/")) {
    const indexPath = path.join(frontendDistPath, "index.html");
    return res.sendFile(indexPath, (err) => {
      if (err) {
        next();
      }
    });
  }
  next();
});

// ===============================
// 404 Handler for API / Unhandled Routes
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