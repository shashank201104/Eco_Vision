import express from "express";
import FormData from "form-data";
import axios from "axios";
import multer from "multer";

const router = express.Router();

// Multer setup: keep uploaded file in memory (not saved to disk)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // limit = 5 MB
});

// POST /upload
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Create a FormData object to send to FastAPI
    const form = new FormData();
    form.append("file", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });
    form.append("confidence", "0.5");

    // Send request to FastAPI
    const fastApiUrl = "http://localhost:8000/detect";
    
    const response = await axios.post(fastApiUrl, form, {
      headers: form.getHeaders(),
    });

    console.log("response ", response);
    // Get class name from detection
    const detectedClass = response.data?.detections?.[0]?.class_name;

    if (!detectedClass) {
      return res.status(404).json({ error: "No object detected" });
    }

    // Fetch item details from your Express backend
    const itemResponse = await axios.get(
      `http://localhost:5000/items/${detectedClass}`
    );

    res.json({
        itemData: itemResponse.data,
        AnnotatedImage: response.data.annotated_image,
    });
  } catch (err) {
    console.error(err );
    res.status(500).json({ error: err.message });
  }
});

export default router;
