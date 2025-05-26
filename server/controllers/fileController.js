import fs from 'fs'
import { read, utils } from 'xlsx'
import path from 'path'
import { fileURLToPath } from 'url'
import { uploadParsedJsonToS3 } from '../utils/uploadFileToS3.js'
import { GoogleGenerativeAI } from '@google/generative-ai'
import File from '../models/fileModel.js'
import Visualization from '../models/visualizationModel.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const handleExcelUpload = async (req, res, next) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ success: false, message: "No file uploaded" })
    }


    const filePath = req.file.path
    const fileBuffer = fs.readFileSync(filePath)
    const workbook = read(fileBuffer)
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

export const AiInsights = async (req, res, next) => {
  try {
    const { data } = req.body
    console.log(data)
    if (!data) {
      return res.status(400).json({ success: false, message: "No data found" })

    }

    const prompt = `Analyze this Excel data and provide high-level insights:\n\n${JSON.stringify(data, null, 2)}`

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const result = await model.generateContent(prompt);
    const insights = result.response.text();

    res.status(200).json({
      success: true,
      insights,
    });
  } catch (error) {
    console.error('AI Insights error:', error);
    res.status(500).json({ success: false, message: 'Failed to generate insights' })
  }
}

export const saveVisualization = async (req, res, next) => {
  try {
    const userId = req.body.userId
    const { chartType, is3d, xAxisKey, yAxisKey, zAxisKey, fileName } = req.body

    let file = await File.findOne({ fileName, uploadedBy: userId })
    if (!file) {
      const filePath = path.join(__dirname, '..', 'media', fileName)
      const fileBuffer = fs.readFileSync(filePath)
      const workbook = read(fileBuffer)
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]
      const jsonData = utils.sheet_to_json(worksheet)
      const awsUpload = await uploadParsedJsonToS3(jsonData, fileName)
      console.log(awsUpload)

      file = await File.create({
        fileName,
        fileUrl: awsUpload.url,
        uploadedBy: userId,
      })

    }

    let visualization = await Visualization.findOne({
      file: file._id,
      chartType,
      is3d,
      xAxisKey,
      yAxisKey,
      zAxisKey,
    })
  
    if (!visualization) {
      visualization = await Visualization.create({
        file: file._id,
        chartType,
        is3d,
        xAxisKey,
        yAxisKey,
        zAxisKey,
      });

    }else{
      return res.status(400).json({success:false, message:"visualization already exists"})
    }

    res.status(200).json({ success: true, message: "visualization is saved" })

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}
