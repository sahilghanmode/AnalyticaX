import { Router } from "express";
import { getAllUsers, getFilesForUser } from "../controllers/adminControllers.js";

const adminRoutes=Router()

adminRoutes.get("/getUsers",getAllUsers)
adminRoutes.get("/getFilesForUser",getFilesForUser)

export default adminRoutes