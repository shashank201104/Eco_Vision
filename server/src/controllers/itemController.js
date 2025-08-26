import Item from "../models/items.js";

//function to get a particular recyleable item data form database
export const getItemByName= async (req,res)=>{
    try {
    const { name } = req.params;
    const item = await Item.findOne({ name: new RegExp(`^${name}$`, "i") }); 

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);

  } catch (error) {
    console.error("itemController Error: ",error.message)
    res.status(500).json({ message: "Error fetching item", error });
  }
}


