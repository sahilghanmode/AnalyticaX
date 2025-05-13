import React from 'react'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/lib/auth-context'

const ProfileHeader = () => {
    const navigate=useNavigate()
    const {logout}=useAuth()

    const handleLogout=()=>{
        logout();
        navigate("/")
    }
  return (
    <div>
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center cursor-pointer"
              onClick={() => navigate("/")}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </div>
            <span className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
              AnalyticaX
            </span>
          </div>
          <Button variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50"  onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Log out
          </Button>
        </div>
      </header>
    </div>
  )
}

export default ProfileHeader
