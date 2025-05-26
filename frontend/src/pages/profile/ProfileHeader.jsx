import React from 'react'
import { Button } from '@/components/ui/button'
import { LogOut, BarChart2, Menu } from 'lucide-react'
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
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 pl-8 cursor-pointer">
            
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                <BarChart2 className="h-4 w-4 text-white" />
              </div>
              <div onClick={()=>navigate("/")}>
                <span className="text-xl font-bold">AnalyticaX</span>
              </div>
           
          </div>

          {/* <div className="md:hidden">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div> */}

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
