import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();
const PORT= process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Backend is LIVE!")
})

app.listen(PORT,()=>{
console.log(`server running at http://localhost:${PORT}`)
})
