import React, { useEffect, useState } from 'react'
import UserPanelHeader from './UserPanelHeader'
import { useParams } from 'react-router-dom'
import { useAdminData } from '@/lib/admin-context'

const AdminUsersPanel = () => {
  const {getCurrentUserforId}=useAdminData()
  const {userId}=useParams()
  const [user,setUser]=useState(null)
  
  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        const result= await getCurrentUserforId(userId)
        setUser(result)
      }
    }
    fetchUser()
  }, [userId])

  return (
    <div className="min-h-screen flex flex-col">
      <UserPanelHeader/>
      this is adminUserpanel
    </div>
  )
}

export default AdminUsersPanel
