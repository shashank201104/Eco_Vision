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

// upload route for sending image from frontend to FastApi backend for item recognition
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
    const fastApiUrl =process.env.NODE_ENV==="production"? process.env.FASTAPI_URL : "http://localhost:8000/detect/";
    
      const response = await axios.post(fastApiUrl, form, {
        headers: form.getHeaders(),    
      });
      

    // Get class name from detection
    const detectedClass = response.data?.detections?.[0]?.class_name;

    if (!detectedClass) {
      return res.status(200).json({
    message: "No object detected",
    itemData: null,
    AnnotatedImage: response.data.annotated_image, // still show image if available
  });
    }
    // Fetch item details from your Express backend
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const itemResponse = await axios.get(
      `${baseUrl}/items/${detectedClass}`
    );

    res.json({
        itemData: itemResponse.data,
        AnnotatedImage: response.data.annotated_image,
    });
  } catch (err) {
    console.log("Error in upload route:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
