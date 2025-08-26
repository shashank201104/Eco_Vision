import axios from "axios";
import fs from "fs";

export const handleUpload = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

     // sending image to python backend
     //this is sample code , change it later accordingly!!!!
    const pythonResponse = await axios.post("http://localhost:8000/predict", {
      imagePath: req.file.path,
    });


    fs.unlinkSync(req.file.path); // delete temp file from upload folder
    res.json(pythonResponse.data);
  } catch (error) {
    console.error("uploadController Error:", error.message);
    res.status(500).json({ message: " Error in processing image" });
  }
};
