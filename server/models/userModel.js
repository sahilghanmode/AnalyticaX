import mongoose from "mongoose";
import { genSalt,hash } from "bcrypt";

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:[true,"Please Enter Your Name"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    email:{
        type:String,
        required:true,
        unique:false,
        lowercase:true,
        trim:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    otp: {
        code: {
          type: String
        },
        expiresAt: {
          type: Date
        },
        createdAt: {
          type: Date
        },
        attempts: {
          type: Number,
          default: 0
        }
    },
    role:{
        type:String,
        default:"user"
    }
},{
    timestamps:true
})

userSchema.methods.isOTPValid = function(otpToVerify) {
    return (
      this.otp && 
      this.otp.code === otpToVerify && 
      this.otp.expiresAt > Date.now()
    );
  };

userSchema.methods.generateOTP = function() {
    const newOTP = Math.floor(100000 + Math.random() * 900000).toString();

    this.otp = {
        code: newOTP,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
        createdAt: new Date(),
        attempts: 0
    };

    return newOTP;
};

userSchema.methods.clearOTP = function() {
    this.otp = undefined;
};

userSchema.methods.incrementOTPAttempts = function() {
    if (this.otp) {
        this.otp.attempts = (this.otp.attempts || 0) + 1;
    }
};

userSchema.pre("save",async function (next) {
    const salt=await genSalt();
    this.password=await hash(this.password,salt);
    next();
})

const User=mongoose.model('User',userSchema);
export default User;