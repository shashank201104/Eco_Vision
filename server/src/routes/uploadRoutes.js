//author- Shashank

import express from "express";
import FormData from "form-data";
import axios from "axios";
import multer from "multer";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// ---------------------------
// HELPER: Correct base URL
// ---------------------------
const getBaseUrl = (req) => {
  // In production, always use ENV BASE_URL
  if (process.env.NODE_ENV === "production") {
    return process.env.BASE_URL; // e.g. https://yourdomain.com
  }

  // Development fallback
  return `${req.protocol}://${req.get("host")}`;
};

// ---------------------------
// Upload Route
// ---------------------------
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const form = new FormData();
    form.append("file", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });
    form.append("confidence", "0.5");

    // FastAPI URL safe assignment
    const fastApiUrl =
      process.env.NODE_ENV === "production"
        ? `${process.env.FASTAPI_URL}/detect/`
        : "http://localhost:8000/detect/";

    const fastResponse = await axios.post(fastApiUrl, form, {
      headers: form.getHeaders(),
    });

    const detectedClasses = fastResponse.data.detections.map(
      (d) => d.class_name
    );

    // Build base URL properly
    const baseUrl = getBaseUrl(req);

    // Faster: 1 request instead of many (if your /items supports query)
    // Otherwise fallback to Promise.all
    const itemResponses = await Promise.all(
      detectedClasses.map(async (c) => {
        const itemRes = await axios.get(`${baseUrl}/items/${c}`);
        return itemRes.data;
      })
    );

    res.json({
      itemData: itemResponses,
      AnnotatedImage: fastResponse.data.annotated_image,
    });
  } catch (err) {
    console.error("Error in upload route:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
