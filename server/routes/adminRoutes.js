import { Router } from "express";
import { getAllUsers, getFilesForUser, getCurrentUser, changeUserRole, deleteUser, deleteFile } from "../controllers/adminControllers.js";

const adminRoutes=Router()

adminRoutes.get("/getUsers",getAllUsers)
adminRoutes.get("/getFilesForUser/:userId",getFilesForUser)
adminRoutes.get("/currentuser/:userId", getCurrentUser)
adminRoutes.patch("/changerole/:userId",changeUserRole)
adminRoutes.delete("/deleteUser/:userId",deleteUser)
adminRoutes.delete("/deletefile/:fileId",deleteFile)

export default adminRoutes