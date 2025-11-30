//Author : Shashank

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    //seting up mongodb database
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error(" database connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
