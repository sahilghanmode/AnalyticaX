import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { LogOut } from 'lucide-react'
import DashboardMain from './DashboardMain'
import { useAdminData } from '@/lib/admin-context'

const AdminDashboard = () => {
    const {allUsers}=useAdminData()
    const {user, logout}=useAuth()
    const navigate=useNavigate()

    console.log(allUsers)

  return (
    <div className="min-h-screen flex flex-col">
        <header className="border-b bg-white">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center cursor-pointer"
                onClick={()=>navigate("/admin/dashboard")}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              </div>
              <span className="text-xl font-bold cursor-pointer" onClick={()=>navigate("/admin/dashboard")}>
                AnalyticaX
              </span>
              <Badge variant="secondary" className="ml-2">
                Admin Dashboard
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Welcome, <span className="font-medium">{user?.fullName || user?.email}</span>
              </div>
              <Button
                variant="ghost"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={logout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log out
              </Button>
            </div>
          </div>
        </header>

        <DashboardMain/>
    </div>
  )
}

export default AdminDashboard
