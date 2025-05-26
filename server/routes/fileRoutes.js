import { Router } from "express"
import { uploadExcel } from "../middlewares/multer.middleware.js"
import { handleExcelUpload, AiInsights, saveVisualization } from "../controllers/fileController.js" 

const fileRoutes = Router()

fileRoutes.post("/uploadfile", uploadExcel.single('excelFile'), handleExcelUpload)
fileRoutes.post("/aiInsights",AiInsights)
fileRoutes.post("/saveVisualization",saveVisualization)

export default fileRoutes
