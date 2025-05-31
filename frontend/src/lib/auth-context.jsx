import { createContext, useContext, useState, useEffect } from "react";
import { axiosInstance } from "../../utils/axios.js";
import { toast } from "sonner";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const getCurrentUser = async function () {
      try {
        const storedUser= sessionStorage.getItem("authToken")
        if(!storedUser){
          const { data } = await axiosInstance.get('/auth/getCurrentUser', { withCredentials: true, });
          if (data) {
            setUser(data);
            setIsAuthenticated(true);
          }
          
        }

        if (storedUser) {
          const parsedUser=JSON.parse(storedUser)
            setUser(parsedUser);
            setIsAuthenticated(true);
          }

      } catch (error) {
        console.log(error);
      }
    }

    getCurrentUser()
  }, []);

  const login = async (email, password,loginFor30Days) => {
    try {
      const res = await axiosInstance.post("/auth/login", { email, password, loginFor30Days });

      const user = res.data.user;
      console.log(user)
      if(!loginFor30Days){
        sessionStorage.setItem("authToken",JSON.stringify(user))
      }
      const message = res.data.message;

      setUser(user);
      setIsAuthenticated(true);

      toast.error(message || "Logged in successfully");
    } catch (error) {
      const message =
        error.response?.data?.message || error.response?.data?.error || "Login failed";
      toast.error(message); // or use a toast
      console.error("Login error:", message);
      throw new Error(message); // forward it if needed
    }
  };



  const signup = async (fullName, email, password, onOpenChange, setVerificationOpen, setEmailforVerification) => {

    try {
      const res = await axiosInstance.post("/auth/signup", { fullName, email, password })
      if (res.status == 201 && res.data.user) {
        const otpRes = await axiosInstance.post("/auth/send-otp", { email })
        toast.message(otpRes.data.message)
        if (otpRes.status === 200) {

          setEmailforVerification(email)
          setVerificationOpen(true)
          onOpenChange()

        } else {
          toast.error(otpRes.data.message)
        }

      } else {
        toast.error(res.data.message)
      }

    } catch (error) {
      console.log("Signup error:", error.message);

      // Show error message depending on where it failed
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }

      // Handle specific error codes if needed
      if (error.response?.status === 400) {
        toast.error("Invalid data provided. Please check your input.");
      } else if (error.response?.status === 409) {
        toast.error("User already exists.");
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    }

  };

  const verify = async (email, otp) => {
    try {
      const res = await axiosInstance.post("/auth/verify", { email, otp })
      if (res.status == 200) {
        const user = res.data.user
        setUser(user)
        setIsAuthenticated(true)

      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  const logout = async () => {
    try {
      const id=user._id
      const res=await axiosInstance.post("/auth/logout",{id},{withCredentials:true})
      
    } catch (error) {
      console.log("error", error)
    }
    setUser(null);
    setIsAuthenticated(false);

  };


  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout, verify }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
