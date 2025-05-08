import { axiosInstance } from "../../utils/axios";
import { toast } from "sonner";

export const signUpApi=async(signUpInputs)=>{
    try {
        const {fullName,email,password}=signUpInputs
    

        const res=await axiosInstance.post("/auth/signup",{fullName,email,password})

        if(!res)return false
    
        return true
        
    } catch (error) {
        console.log("signup user error:",error.response.data)
        return error.response.data
    }
}

export const sendOtp=async(signUpInputs)=>{
    try {

        const {email}=signUpInputs

        const res=await axiosInstance.post("/auth/send-otp",{email})

        if(!res){
            return false
        }

        return true
        
    } catch (error) {
        console.log("sendOtp user error:", error.response.data)
        return error.response.data
    }
}

export const loginApi=async(loginInputs)=>{
    try {

        const {email, password}=loginInputs

        const res=await axiosInstance.post("/auth/login",{email,password})
        return res.data
        
    } catch (error) {
        console.log("login user error:",error.response.data)
        return error.response.data
    }
}