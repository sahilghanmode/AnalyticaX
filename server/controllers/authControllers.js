import jwt from "jsonwebtoken"
import User from "../models/userModel.js";
import {compare} from "bcrypt"
import nodemailer from "nodemailer";


const maxAge=3*24*60*60*1000;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'thorsthorkel@gmail.com',
      pass: 'zksl gett jana gtue'
    }
  });

const createToken=(email,userId)=>{
    return jwt.sign({email,userId},process.env.JWT_SECRET,{expiresIn:maxAge})
};

export const verifyOtp=async(req,res)=>{

    try {
        const {email,otp}=req.body

        if(!email){
            res.status(400).json({
                success:false,
                message:"email is missing"
            })
        }

        if(!otp){
            res.status(400).json({
                success:false,
                message:"otp is required"
            })
        }
         
        const user=await User.findOne({email})

            user.incrementOTPAttempts();

            if(user.otp.attempts>=5){
                user.clearOTP();
            await user.save();
            
            return res.status(400).json({ 
                success: false, 
                message: 'Too many failed attempts. Please request a new OTP.' 
            });
        }

        if (!user.isOTPValid(otp)) {
            return res.status(400).json({ 
              success: false, 
              message: 'Invalid or expired OTP' 
            });
          }

        user.isVerified = true;
        user.clearOTP();
        await user.save();
          
         
        res.status(200).json({ 
            success: true, 
            message: 'Email verified successfully',
            user: {
                fullName: user.fullName,
                email: user.email,
            }
        });


    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ 
        success: false, 
        message: 'Failed to verify OTP', 
        error: error.message 
        });
    }
    
}

export const sendOtp=async(req,res)=>{
    try {
        const {email}=req.body
        if(!email){
            res.status(400).json({
                success:"false",
                message:"Email is required"
            })
        }

        let user=await User.findOne({email})
        
        if(!user){
            
            return res.status(400).json({
                success:false,
                message:"Invalid Email"
            })
        }

        const otp = user.generateOTP();

        await user.save();

        const mailOptions = {
            from: 'thorsthorkel@gmail.com',
            to: email,
            subject: 'Your OTP Verification Code',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>OTP Verification</h2>
                <p>Your One-Time Password (OTP) for verification is:</p>
                <h1 style="color: #4a90e2; font-size: 32px; letter-spacing: 2px;">${otp}</h1>
                <p>This OTP will expire in 15 minutes.</p>
                <p>If you didn't request this code, please ignore this email.</p>
              </div>
            `
          };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ 
            success: true, 
            message: 'OTP sent successfully to your email' 
          });


    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ 
        success: false, 
        message: 'Failed to send OTP', 
        error: error.message 
        });
    }
}


export const signup=async(req,res,next)=>{
    try {
        console.log(req.body)

        const {fullName,email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({message:"username and password are required"});
        }
        if(!fullName){
            return res.status(400).json({
                message:"Name is required"
            })
        }

        const alreadyExisting=await User.findOne({email})
        if(alreadyExisting){
            return res.status(409).json({
                message:"User already exists"
            })
        }
        const user=await User.create({fullName,password,email});
        res.cookie("jwt",createToken(email,user.id),{
            maxAge,
            secure:true,
            sameSite:"None"
        });
        return res.status(201).json({
            user:{
                id:user.id,
                fullName:user.fullName,
                email:user.email,
                
            }
        })


    } catch (error) {
        console.log({error});
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}


export const login=async(req,res,next)=>{
    try {
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({
                message:"Email and Password are required"
            })
        }

        const user=await User.findOne({email})
        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }

        if(!user.isVerified){
            return res.status(400).json({message:"user is not verified"})
        }
        
        const auth=await compare(password,user.password)

        if(!auth){
            return res.status(400).json({message:"Password does not match"})
        }
        res.cookie("jwt",createToken(email,user.id),{
            maxAge,
            secure:true,
            sameSite:"None",
        })
        console.log("User is logged in")
        return res.status(200).json({
            user:{
                id:user.id,
                fullName:user.fullName,
                email:user.email,
                
            }
        })
        
    } catch (error) {
        console.log({error})
        return res.status(500).json({
            message:"Internal Server Error from Login Controller"
        })
    }
}