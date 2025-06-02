import User from "../models/userModel.js"
import File from "../models/fileModel.js"

export const getAllUsers=async(req,res,next)=>{
    try {
        const users=await User.find()
        res.status(200).json({success:true, users})
    } catch (error) {
        console.log("error from getAllUsers controller",{error})
        return res.status(500).json({success:false, message:"something went wrong"})
    }
}

export const getCurrentUser=async(req,res,next)=>{
    try {
        const userId=req.params.userId
        const user=await User.findById(userId).select('-password')
        if(user){
            return res.status(200).json({success:true, user})
        }
    } catch (error) {
        console.log("error from getCurrentUser controller",{error})
        return res.status(500).json({success:false, message:"something went wrong"})
    }
}

export const getFilesForUser=async(req,res,next)=>{
    try {
        const userId=req.params.userId
        const files=await File.find({uploadedBy:userId})
        if(files){
            return res.status(200).json({success:true, files})
        }else{
            return res.status(400).json({success:false, message:"something went wrong"})
        }
    } catch (error) {
        console.log("error from getFilesForUser controller",{error})
        return res.status(500).json({success:false, message:"something went wrong"})
    }
}

export const changeUserRole=async(req,res,next)=>{
    try {
        const userId=req.params.userId
        const {newRole}=req.body
        const user = await User.findByIdAndUpdate(
            userId,
            { role: newRole },
            { new: true } 
        )
        if(!user){
            return res.status(400).json({success:false, message:"user not found"})

        }
        return res.status(200).json({success:true, message:"user updated successfully", user})

    } catch (error) {
        console.log("error in changeUserRole controller",{error})
        return res.status(500).json({success:false, message:"something went wrong"})
    }
}

export const deleteUser=async(req,res)=>{
    try {
        const userId=req.params.userId

        const user=await User.findByIdAndDelete(userId);

        if(!user){
            return res.status(400).json({success:false, message:"user not found"})
        }
        
        return res.status(200).json({success:true, message:"user deleted successfully"})
        
    } catch (error) {
        console.log("error in deleteUser controller",{error})
        return res.status(500).json({success:false, message:"something went wrong"})
    }
}

export const deleteFile=async(req,res,next)=>{
    console.log("this is deletfile")
}