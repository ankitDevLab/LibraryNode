const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const { errorHandler, notFound } = require("./middleware/errorHandler");

const studentRoutes = require("./routes/studentRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const authRoutes = require("./routes/authRoutes");
const libraryRoutes = require("./routes/libraryRoutes");
const seatRoutes = require("./routes/seatRoutes");
const librarianRoutes = require("./routes/librarianRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.get("/", (req, res) => {
  res.send("LibrarySphere Backend Running 🚀");
});

app.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "MongoDB Backend Working",
  });
});

app.use("/api/students", studentRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/libraries", libraryRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/librarians", librarianRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/seats", seatRoutes);

// Must be registered after all routes.
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server Running on Port ${PORT}`);
});
