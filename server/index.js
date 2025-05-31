import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from 'cors'
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import fileRoutes from "./routes/fileRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config()


const port = process.env.PORT || 5000;
const databaseURL = process.env.DATABASE_URL;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


app.get("/", (req, res) => {
    res.send("Hello world")
})

app.use("/api/auth", authRoutes)

app.use("/api/file", fileRoutes)

app.use("/api/admin",adminRoutes)

app.listen(port, () => console.log(`server is running on port ${port} `))


mongoose.connect(databaseURL).then(() => {
    console.log("database connected successfully")
}).catch((err) => console.log(err.message))
