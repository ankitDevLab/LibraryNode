console.log("✅ uploadRoutes loaded");
const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.send("Upload Route Working");
});
const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post("/", upload.single("photo"), async (req, res) => {
    console.log("📸 Upload route hit");
    
    try {
        console.log("File received:", req.file);
        
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader
            .upload_stream(
                {
                    folder: "librarysphere/students",
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            )
            .end(req.file.buffer);
        });
        
        console.log("Cloudinary Result:", result);
        
        res.json({
            success: true,
            imageUrl: result.secure_url,
        });
    } catch (error) {
        console.error("UPLOAD ERROR:", error);
        
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
module.exports = router;