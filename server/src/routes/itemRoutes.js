//Author: Shashank
import express from "express";
import {getItemByName} from "../controllers/itemController.js";

const router = express.Router();

//Route to get a particular item from database
router.get("/:name", getItemByName);


export default router;
