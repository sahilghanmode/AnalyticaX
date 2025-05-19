import { Router } from "express";
import { signup,login,sendOtp,verifyOtp, getCurrentUser } from "../controllers/authControllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const authRoutes=Router();

authRoutes.post("/signup",signup)
authRoutes.post("/login",login)
authRoutes.post("/send-otp",sendOtp)
authRoutes.post("/verify",verifyOtp)
authRoutes.get('/getCurrentUser' , verifyJWT , getCurrentUser);

export default authRoutes
