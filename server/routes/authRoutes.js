import { Router } from "express";
import { signup,login,sendOtp,verifyOtp } from "../controllers/authControllers.js";


const authRoutes=Router();

authRoutes.post("/signup",signup)
authRoutes.post("/login",login)
authRoutes.post("/send-otp",sendOtp)
authRoutes.post("/verify",verifyOtp)

export default authRoutes
