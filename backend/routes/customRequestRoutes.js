const express = require("express");
const router = express.Router();
const CustomRequest = require("../models/CustomRequest");

// Create Custom Request (Student Side)
router.post("/", async (req, res) => {
  try {
    const customRequest = await CustomRequest.create(req.body);
    res.status(201).json({
      success: true,
      customRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get Custom Requests (Librarian/Student Side, filtered by libraryId)
router.get("/", async (req, res) => {
  try {
    const { libraryId } = req.query;
    const filter = {};
    if (libraryId) {
      filter.libraryId = libraryId;
    }
    const customRequests = await CustomRequest.find(filter).sort({ createdAt: -1 });
    res.json({
      success: true,
      customRequests,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Update Custom Request Status (Librarian Side)
router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const customRequest = await CustomRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!customRequest) {
      return res.status(404).json({
        success: false,
        message: "Custom request not found.",
      });
    }
    res.json({
      success: true,
      customRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
