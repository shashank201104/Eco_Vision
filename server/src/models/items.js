//Author: Shashank
import mongoose from "mongoose";

//Schema for item's data in database
//Name: stores the name of item (work as primary key)
//Shelf Life: stores the shelf life (time period of using that item)
//Carbon Footprint : stores the value(in kg) of carbon emission of item in its lifetime
//Recycling Tips: Stores list containing tips to recycle the corresponding items
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
      type: Number, // in kg CO₂ equivalent
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
