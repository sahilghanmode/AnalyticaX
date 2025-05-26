import { Router } from "express"
import { uploadExcel } from "../middlewares/multer.middleware.js"
import { handleExcelUpload, AiInsights, saveVisualization, getHistory, getVisualizationbyId } from "../controllers/fileController.js" 

const fileRoutes = Router()

fileRoutes.post("/uploadfile", uploadExcel.single('excelFile'), handleExcelUpload)
fileRoutes.post("/aiInsights",AiInsights)
fileRoutes.post("/saveVisualization",saveVisualization)
fileRoutes.get("/gethistory",getHistory)
fileRoutes.get("/getVisualizationbyId",getVisualizationbyId)

export default fileRoutes
