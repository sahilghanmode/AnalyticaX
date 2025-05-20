import fs from 'fs'
import { read, utils } from 'xlsx'
import { uploadFileToS3 } from '../utils/uploadFileToS3.js'

export const handleExcelUpload = async (req, res, next) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ success: false, message: "No file uploaded" })
    }


    const filePath = req.file.path
    const fileBuffer = fs.readFileSync(filePath)
    const awsUpload = await uploadFileToS3(fileBuffer, req.file.originalname)
    console.log(awsUpload.url);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const jsonData = utils.sheet_to_json(worksheet)

    res.status(200).json({
      success: true,
      message: "File uploaded and parsed successfully",
      data: jsonData,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
