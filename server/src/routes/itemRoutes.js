import express from "express";
import {getItemByName} from "../controllers/itemController.js";

const router = express.Router();

//get a particular item
router.get("/:name", getItemByName);


export default router;
