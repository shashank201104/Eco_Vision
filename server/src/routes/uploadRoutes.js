import express from "express";
import multer from "multer";
import {handleUpload} from "../controllers/uploadController.js";

const router = express.Router();

//creating a 'uploads' folder for multer to store input image
const upload = multer({dest: "uploads/", limits: { fileSize: 5 * 1024 * 1024 }}); //limiting upload size to 5 MB

router.post("/",upload.single("image"),handleUpload);

export default router;
