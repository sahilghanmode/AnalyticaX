import { Router } from "express"
import { uploadExcel } from "../middlewares/multer.middleware.js"
import { handleExcelUpload } from "../controllers/fileController.js" 

const fileRoutes = Router()

fileRoutes.post("/uploadfile", uploadExcel.single('excelFile'), handleExcelUpload)

export default fileRoutes
