import React from 'react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeft,
    LogOut 
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/lib/auth-context'

const UserPanelHeader = () => {
    const {user,logout}=useAuth()
    const navigate=useNavigate()

    const handleLogout=()=>{
        logout()
        navigate("/")
    }

    return (
        <header className="border-b bg-white">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/admin/dashboard")}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Dashboard
                    </Button>
                    <div className="flex items-center gap-2">
                        <div
                            className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center cursor-pointer"
                            onClick={() => navigate("/")}
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
                        <span className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
                            AnalyticaX
                        </span>
                        <Badge variant="secondary" className="ml-2">
                            User Management
                        </Badge>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-600">
                        Admin: <span className="font-medium">{user?.fullName || user?.email}</span>
                    </div>
                    <Button
                        variant="ghost"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={handleLogout}
                    >
                        <LogOut className="h-4 w-4 mr-2" />
                        Log out
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default UserPanelHeader
