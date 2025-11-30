// Author: Shashank
import express from "express";
import Feedback from "../models/feedback.js";
// import {secureRoute} from "../middleware/auth.middleware.js"
const router = express.Router();

// ===============================
// GET: Fetch all feedbacks
// ===============================
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();

    return res.status(200).json(feedbacks);

  } catch (error) {
    console.error("Feedback GET Error:", error.message);
    return res.status(500).json({ 
      message: "Error fetching feedbacks"
    });
  }
});


// ===============================
// POST: Submit new feedback
// ===============================
router.post("/", async (req, res) => {
  try {
    const { name, feedback, rating } = req.body;

    if (!name || !feedback || !rating) {
      return res.status(400).json({
        message: "Name, feedback, and rating are required",
      });
    }

    const newFeedback = new Feedback({ name, feedback, rating });
    await newFeedback.save();

    return res.status(201).json({
      message: "Feedback submitted successfully",
    });

  } catch (error) {
    console.error("Feedback POST Error:", error.message);
    return res.status(500).json({
      message: "Error submitting feedback",
    });
  }
});


export default router;
