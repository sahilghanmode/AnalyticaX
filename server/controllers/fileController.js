import fs from 'fs'
import { read, utils } from 'xlsx'
import { uploadFileToS3 } from '../utils/uploadFileToS3.js'
import { GoogleGenerativeAI } from '@google/generative-ai'

export const handleExcelUpload = async (req, res, next) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ success: false, message: "No file uploaded" })
    }


    const filePath = req.file.path
    const fileBuffer = fs.readFileSync(filePath)
    const awsUpload = await uploadFileToS3(fileBuffer, req.file.originalname)
    console.log(awsUpload.url);
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

export const AiInsights=async(req,res,next)=>{
  try {
    const {data}=req.body
    console.log(data)
    if(!data){
      return res.status(400).json({success:false, message:"No data found"})

    }

    const prompt=`Analyze this Excel data and provide high-level insights:\n\n${JSON.stringify(data, null, 2)}`

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
