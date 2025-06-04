import React from 'react'
import { 
    DropdownMenu, 
    DropdownMenuTrigger,
    DropdownMenuLabel, 
    DropdownMenuItem, 
    DropdownMenuContent,
    DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { 
    MoreHorizontal,
    Key,
    UserX,
    UserCheck,
    UserIcon,
    Shield,
    Crown,
    Trash2
} from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { axiosInstance } from '../../../../utils/axios.js'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const DropDownActions = ({ user, setUser }) => {
    const userId=user._id
    const navigate=useNavigate()

    const {user:currentUser}=useAuth()


    const handlePasswordReset=()=>{
        console.log("handlepasswordreset")
    }

    const handleSuspendUser=async()=>{
        try {
            const res=await axiosInstance.patch(`/admin/suspend/${userId}`)
            if(res.data.success){
                setUser(res.data.user)
                toast.message(res.data.message)
            }


        } catch (error) {
            console.log("error in handleSuspendUser",{error})
        }
    }

    const handleReactivateUser=async()=>{
        try {
            const res=await axiosInstance.patch(`/admin/reactive/${userId}`)
            if(res.data.success){
                setUser(res.data.user)
                toast.message(res.data.message)
            }
        } catch (error) {
            console.log("error in handleReactiveUser",{error})
        }
        
    }

    const handleRoleChange=async(newRole)=>{
        try {
            const res=await axiosInstance.patch(`/admin/changerole/${userId}`,{newRole})

            if(res.data.success){
                setUser(res.data.user)
                toast.message(res.data.message)
            }
            
        } catch (error) {
            console.log("error in handleRoleChange",{error})
        }
    }

    const handleDeleteUser=async()=>{
        try {
            const res=await axiosInstance.delete(`/admin/deleteUser/${userId}`)
            if(res.data.success){
                toast.message(res.data.message)
                navigate("/admin/dashboard")
            }else{
                toast.error("Something went wrong")
            }
        } catch (error) {
            console.log("error from handleDeleteUser",{error})
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full">
                        <MoreHorizontal className="h-4 w-4 mr-2" />
                        Actions
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={handlePasswordReset} className="cursor-pointer" >
                        <Key className="mr-2 h-4 w-4" />
                        Send Password Reset
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Account Status</DropdownMenuLabel>
                    {user.suspended == false && (
                        <>
                            <DropdownMenuItem onClick={handleSuspendUser} disabled={user._id ==currentUser?._id} className="cursor-pointer">
                                <UserX className="mr-2 h-4 w-4" />
                                Suspend User
                            </DropdownMenuItem>
                            {/* <DropdownMenuItem onClick={handleBanUser} disabled={user.id === currentUser?.id}>
                                <Ban className="mr-2 h-4 w-4" />
                                Ban User
                            </DropdownMenuItem> */}
                        </>
                    )}
                    {(user.suspended ==true) && (
                        <DropdownMenuItem onClick={handleReactivateUser} disabled={user._id === currentUser?._id} className="cursor-pointer">
                            <UserCheck className="mr-2 h-4 w-4" />
                            Reactivate User
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Change Role</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => handleRoleChange("user")}
                        disabled={user.role == "user" || user._id === currentUser?._id} className="cursor-pointer"
                    >
                        <UserIcon className="mr-2 h-4 w-4" />
                        User
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem
                        onClick={() => handleRoleChange("moderator")}
                        disabled={user.role === "moderator" || user._id === currentUser?._id} className="cursor-pointer"
                    >
                        <Shield className="mr-2 h-4 w-4" />
                        Moderator
                    </DropdownMenuItem> */}
                    <DropdownMenuItem
                        onClick={() => handleRoleChange("admin")}
                        disabled={user.role == "admin" || user._id === currentUser?._id} className="cursor-pointer"
                    >
                        <Crown className="mr-2 h-4 w-4" />
                        Admin
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={handleDeleteUser}
                        disabled={user._id === currentUser?._id}
                        className="text-red-600 focus:text-red-600 cursor-pointer"
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete User Permanently
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default DropDownActions
