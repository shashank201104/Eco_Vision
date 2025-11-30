import mongoose from "mongoose";

const FeedBackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  feedback: { type: String, required: true },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

const Feedback = mongoose.model("Feedback", FeedBackSchema);
export default Feedback;
