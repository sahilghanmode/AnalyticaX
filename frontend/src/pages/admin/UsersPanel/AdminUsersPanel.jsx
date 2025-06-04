import React, { useEffect, useState } from 'react'
import UserPanelHeader from './UserPanelHeader'
import { useParams } from 'react-router-dom'
import FilesAndProjects from './FilesAndProjects'
import { useAdminData } from '@/lib/admin-context'
import UserProfileHeader from './UserProfileHeader'
import StatisticsCards from './StatisticsCards'
import { axiosInstance } from '../../../../utils/axios.js'

const AdminUsersPanel = () => {
  const {getCurrentUserforId}=useAdminData()
  const {userId}=useParams()
  const [user,setUser]=useState(null)
  const [files,setFiles]=useState([])
  const [projects,setAllProjects]=useState([])

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        const result= await getCurrentUserforId(userId)
        setUser(result)
      }else{
        console.log("userId is undefined")
      }
    }
    fetchUser()
  }, [userId,getCurrentUserforId, ])

  useEffect(()=>{
    const getProjects=async()=>{
      try {
        const res=await axiosInstance.get(`/admin/getprojects/${userId}`)
        if(res.data.success){
          setAllProjects(res.data.data)
        }
      } catch (error) {
        console.log("error from admindata provider",{error})
      }
    }
    getProjects()
  },[])

  useEffect(()=>{
    const fetchFiles=async()=>{
      if(userId){
        try {
          const result=await axiosInstance.get(`/admin/getFilesForUser/${userId}`)
          console.log(result.data)
          if(result.data.success){
            setFiles(result.data.files)
          }
          
        } catch (error) {
          console.log("something went wrong",{error})
          return 
        }
        
      }
    }

    fetchFiles()
  },[userId,])


  return (
    <div className="min-h-screen flex flex-col">
      <UserPanelHeader/>
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
            <UserProfileHeader user={user} setUser={setUser} /> 
            <StatisticsCards files={files} projects={projects} />
            <FilesAndProjects files={files} setFiles={setFiles} projects={projects} setAllProjects={setAllProjects} />
        </div>
      </main>
    </div>
  )
}

export default AdminUsersPanel
