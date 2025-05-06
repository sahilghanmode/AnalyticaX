import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";

dotenv.config()

const port=process.env.PORT||5000;
const databaseURL=process.env.DATABASE_URL;

const app=express();

app.use(express.json());


app.get("/",(req,res)=>{
    res.send("Hello world")
})

app.use("/api/auth",authRoutes)

app.listen(port,()=>console.log(`server is running on port ${port} `))

mongoose.connect(databaseURL).then(()=>{
    console.log("database connected successfully")
}).catch((err)=>console.log(err.message))