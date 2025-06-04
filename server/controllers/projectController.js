import File from "../models/fileModel.js"
import Project from "../models/Project.js"
import fs from 'fs';
import path from 'path'
import { fileURLToPath } from 'url'
import { read, utils } from 'xlsx'
import { uploadParsedJsonToS3 } from "../utils/s3Config.js"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createProject=async(req,res,next)=>{
    try {
        const {name, description, fileNames, userId}=req.body
        if(!name){
            return res.status(400).json({success:false, message:"name is required"})
        }

        let existingProject = await Project.findOne({ name, user:userId });
        if (existingProject) {
            return res.status(400).json({ success: false, message: "Project with this name already exists" });
        }
        const filesData=[]

        for(const singleFileName of fileNames){
            let file=await File.findOne({singleFileName, userId})
            if(!file){
                const filePath = path.join(__dirname, '..', 'media', singleFileName)
                const fileBuffer = fs.readFileSync(filePath)
                const workbook = read(fileBuffer)
                const worksheet = workbook.Sheets[workbook.SheetNames[0]]
                const jsonData = utils.sheet_to_json(worksheet)
                const awsUpload = await uploadParsedJsonToS3(jsonData, singleFileName)

                file = await File.create({
                    fileName:singleFileName,
                    fileUrl: awsUpload.url,
                    uploadedBy: userId,
                })
            }

            filesData.push(file._id)
        }

        const project=await Project.create({
            name,
            description,
            user: userId,
            files: filesData,
        })

        return res.status(200).json({success:true, message:"project created successfully"}, project)
        
    } catch (error) {
        console.log("error in createproject controller",{error})
        return res.status(500).json({success:false, message:"Internal server error"})
    }
}

export const getAllProjects = async (req, res) => {
  try {
    const { userId } = req.query; // sent from frontend as query param

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const projects = await Project.find({ user: userId })
      .populate("files") // Optional: populate file details
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};