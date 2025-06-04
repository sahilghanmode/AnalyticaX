import User from "../models/userModel.js"
import File from "../models/fileModel.js"
import Visualization from "../models/visualizationModel.js"

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
    try {
        const fileId=req.params.fileId
        if(!fileId){
            return res.status(400).json({success:false, message:"fileId is required"}
            )
        }

        const deletedFile=await File.findByIdAndDelete(fileId)

        const deletedVisualizations = await Visualization.deleteMany({ file: fileId })

        if(!deletedFile){
            return res.status(404).json({success:false, message:"file not found"})
        }

        return res.status(200).json({success:true, message:"file deleted successfully"})
        
    } catch (error) {
        console.log("error from deleteFile",{error})
        return res.status(500).json({success:false, message:"something went wrong"})
    }
}

export const archiveFile=async(req,res,next)=>{
    try {
        const fileId=req.params.fileId
        if(!fileId){
            return res.status(400).json({success:false,message:"fileId is required"})
        }

        const updatedFile = await File.findByIdAndUpdate(
            fileId,
            { isArchived: true },
            { new: true }
        );

        if (!updatedFile) {
            return res.status(404).json({ success: false, message: "File not found." });
        }
        return res.status(200).json({ success: true, message: "File archived successfully.", file: updatedFile });
    } catch (error) {
        console.error("Error archiving file:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
}

export const unarchiveFile = async (req, res, next) => {
  try {
    const fileId = req.params.fileId;

    const updatedFile = await File.findByIdAndUpdate(
      fileId,
      { isArchived: false },
      { new: true }
    );

    if (!updatedFile) {
      return res.status(404).json({ success: false, message: "File not found." });
    }

    return res.status(200).json({ success: true, message: "File unarchived successfully.", file: updatedFile });
  } catch (error) {
    console.error("Error unarchiving file:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
}

export const suspendUser=async(req,res,next)=>{
    try {
        const { userId } = req.params;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { suspended: true },
            { new: true }
        );

        if (!updatedUser) return res.status(404).json({ success: false, message: 'User not found' });

        return res.status(200).json({ success: true, message: 'User suspended', user: updatedUser });
        
    } catch (error) {
        console.log("error from suspendUser controleer",{error})
        return res.status(500).json({success:false, message:"Internal server error"})
    }
}

export const reactiveUser=async(req,res,next)=>{
    try {
        const { userId } = req.params;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { suspended: false },
            { new: true }
        );

        if (!updatedUser) return res.status(404).json({ success: false, message: 'User not found' });

        return res.status(200).json({ success: true, message: 'User reactivated', user: updatedUser });
  } catch (error) {
        console.error('Error reactivating user:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}