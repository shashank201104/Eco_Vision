import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import ItemRoutes from "./routes/itemRoutes.js"
import UploadRoutes from "./routes/uploadRoutes.js"

dotenv.config();
connectDB();

const app = express();
const PORT= process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/items",ItemRoutes);
app.use("/upload",UploadRoutes);

app.get("/",(req,res)=>{
    res.send("Backend is LIVE!")
})

app.listen(PORT,()=>{
console.log(`server running at http://localhost:${PORT}`)
})
