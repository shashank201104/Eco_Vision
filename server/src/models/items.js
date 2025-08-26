import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    shelf_Life: {
      type: String, 
      required: true,
    },
    carbon_Footprint: {
      type: Number,     // in kg CO₂ equivalent
      required: true, 
      min: 0,
    },
    recycle_Tips: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;