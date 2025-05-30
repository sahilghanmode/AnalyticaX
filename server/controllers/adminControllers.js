import User from "../models/userModel.js"

export const getAllUsers=async(req,res,next)=>{
    try {
        const users=await User.find()
        res.status(200).json({success:true, users})
    } catch (error) {
        
    }
}

export const getFilesForUser=async(req,res,next)=>{
    console.log("object")
}