import { createContext, useContext, useEffect, useState } from 'react'
import { axiosInstance } from '../../utils/axios.js'

const AdminContext = createContext(undefined)

export const AdminDataProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState([])

  useEffect(()=>{
    const getUsers=async()=>{
        try {
            const users=await axiosInstance.get("/admin/getUsers")
            setAllUsers(users.data.users)
        } catch (error) {
            
        }
    }
    getUsers()
  },[])



  const getCurrentUserforId=async(userId)=>{
    try {
      const res=await axiosInstance.get(`/admin/currentuser/${userId}`)
      if(res.data.success){
        return res.data.user
      }
      
    } catch (error) {
      console.log("error from getCurrentUserforID",{error})
    }
  }


  return (
    <AdminContext.Provider value={{ allUsers, setAllUsers, getCurrentUserforId }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdminData(){
    const context=useContext(AdminContext)
    if (context === undefined) {
        throw new Error("useExcelData must be used within an ExcelData provider");
    }
    return context;
}