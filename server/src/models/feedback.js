//Author - shashank
import mongoose from "mongoose";

// ================ Schema for User's feedback ================
//name: stores the user's name 
//feedback: stores the user's feedback
//rating stores the user given rating ranging from 0-5
 
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
