import User from "../models/userModel.js";
import jwt from "jsonwebtoken"

export const verifyJWT = async(req,res,next)=>{
    try {
        const token = req.cookies?.authToken || req.header("Authorization")?.replace("Bearer " , "")?.trim();
        if(!token){
        return res.status(401).json({
            message:"Internal Server Error from Login Controller"
        })
        }
        
        const decodedToken = jwt.verify(token , process.env.JWT_SECRET )
        console.log(decodedToken)
        const user = await User.findById(decodedToken?.userId).select('-password')


        if(!user){
            return res.status(401).json({
            message:"Unautorised"
        })
        }

        req.user = user;
        next()

    } catch (error) {
        return new ApiError(error?.message || " Invalid Access Token" )
    }
}

export const authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){  //should run for req.user.role == "user"
            // if req.user.role == "user"  then this if condition will be !false=>true
            //but if role is admin,then roles.include("admin") =>  !true=> false (this will not enter the if block)

            // next(new ApiError(`Role ${req.user.role} is not allowed to access this resource` , 403))
        }
        next();
    }
}