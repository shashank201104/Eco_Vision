//Author: Shashank

import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import ItemRoutes from "./routes/itemRoutes.js"
import UploadRoutes from "./routes/uploadRoutes.js"
import Auth from "./routes/Auth.js"
import cookieparser from "cookie-parser"

dotenv.config();
connectDB();

const app = express();
const PORT= process.env.PORT || 5000;

//using cors for cross origin access and json for api's data parsing 
app.use(cors(
    { origin: 'http://localhost:5173',
    credentials: true }

));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

//route to check user authentication status(login/signup)
app.use("/auth",Auth);

//route to fetch recylable items's data from database.
app.use("/items",ItemRoutes);

//route for upload user's image for item recognition 
app.use("/upload",UploadRoutes);

app.get("/",(req,res)=>{
    res.send("Backend is LIVE!")
})

app.listen(PORT,()=>{
console.log(`server running at http://localhost:${PORT}`)
})
