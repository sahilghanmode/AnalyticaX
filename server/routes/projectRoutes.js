import { Router } from "express";
import { createProject, getAllProjects } from "../controllers/projectController.js";

const projectRoutes=Router()

projectRoutes.post("/createproject",createProject)
projectRoutes.get('/getallProjects',getAllProjects)

export default projectRoutes