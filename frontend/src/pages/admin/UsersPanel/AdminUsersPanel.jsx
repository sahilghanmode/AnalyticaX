import React, { useEffect, useState } from 'react'
import UserPanelHeader from './UserPanelHeader'
import { useParams } from 'react-router-dom'
import FilesAndProjects from './FilesAndProjects'
import { useAdminData } from '@/lib/admin-context'
import UserProfileHeader from './UserProfileHeader'
import StatisticsCards from './StatisticsCards'

const AdminUsersPanel = () => {
  const {getCurrentUserforId}=useAdminData()
  const {userId}=useParams()
  const [user,setUser]=useState(null)

  useEffect(() => {
    console.log("it is here")
    const fetchUser = async () => {
      if (userId) {
        const result= await getCurrentUserforId(userId)
        setUser(result)
      }else{
        console.log("userId is undefined")
      }
    }
    fetchUser()
  }, [userId,getCurrentUserforId ])
  console.log(user)

  return (
    <div className="min-h-screen flex flex-col">
      <UserPanelHeader/>
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
            <UserProfileHeader user={user} /> 
            <StatisticsCards/>
            <FilesAndProjects userId={userId} />
        </div>
      </main>
    </div>
  )
}

export default AdminUsersPanel
