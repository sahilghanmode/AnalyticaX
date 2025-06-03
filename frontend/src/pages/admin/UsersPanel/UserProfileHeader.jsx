import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { 
    Calendar,
    Shield,
    Crown,
    UserIcon,
    Mail,
    Phone,
    Globe
} from 'lucide-react'
import DropDownActions from './DropDownActions'

const UserProfileHeader = ({user,setUser}) => {
    if(!user){
        return (
            <div>
                Loading user..
            </div>
        )
    }
    const getInitials=()=>{
        if(user.fullName){
            return user.fullName
                .split(" ")
                .map(n=>n[0])
                .join("")
                .toUpperCase();
        }
        return user.email.charAt(0).toUpperCase()
    }

    const getRoleBadgeVariant = (role) => {
        switch (role) {
            case "admin":
            return "default";
            case "moderator":
            return "secondary";
            default:
            return "outline";
        }
    }

    function formatTimestamp(isoString) {
        const date = new Date(isoString);
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    const getRoleIcon = (role) => {
        switch (role) {
        case "admin":
            return <Crown className="h-4 w-4" />
        case "moderator":
            return <Shield className="h-4 w-4" />
        default:
            return <UserIcon className="h-4 w-4" />
        }
    }


    return (
        <div className="mb-8">
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage 
                                // src={user.image || ""} 
                                alt={user.fullName || user.email} />
                                <AvatarFallback className="text-2xl">{getInitials}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className="text-2xl font-bold">{user.fullName || "No name"}</h1>
                                <p className="text-gray-600">{user.email}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <Badge variant={getRoleBadgeVariant(user.role)} className="flex items-center gap-1">
                                        {getRoleIcon(user.role)}
                                        {user.role}
                                    </Badge>
                                    <Badge variant={user.status === "active" ? "default" : "destructive"}>{user.status}</Badge>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-medium text-gray-900 mb-2">Contact Information</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-gray-400" />
                                        <span>{user.email}</span>
                                    </div>
                                    {user.mobile && (
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4 text-gray-400" />
                                            <span>{user.mobile}</span>
                                        </div>
                                    )}
                                    {user.website && (
                                        <div className="flex items-center gap-2">
                                            <Globe className="h-4 w-4 text-gray-400" />
                                            <span>{user.website}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-medium text-gray-900 mb-2">Account Details</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-gray-400" />
                                        <span>Joined: {formatTimestamp(user.createdAt)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-gray-400" />
                                        <span>Last login: {user.lastLogin}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <DropDownActions user={user} setUser={setUser}/>
                        {/* <div className="flex flex-col gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full">
                                        <MoreHorizontal className="h-4 w-4 mr-2" />
                                        Actions
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={handlePasswordReset}>
                                        <Key className="mr-2 h-4 w-4" />
                                        Send Password Reset
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuLabel>Account Status</DropdownMenuLabel>
                                    {user.status === "active" && (
                                        <>
                                            <DropdownMenuItem onClick={handleSuspendUser} disabled={user.id === currentUser?.id}>
                                                <UserX className="mr-2 h-4 w-4" />
                                                Suspend User
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={handleBanUser} disabled={user.id === currentUser?.id}>
                                                <Ban className="mr-2 h-4 w-4" />
                                                Ban User
                                            </DropdownMenuItem>
                                        </>
                                    )}
                                    {(user.status === "suspended" || user.status === "banned" || user.status === "inactive") && (
                                        <DropdownMenuItem onClick={handleReactivateUser} disabled={user.id === currentUser?.id}>
                                            <UserCheck className="mr-2 h-4 w-4" />
                                            Reactivate User
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuLabel>Change Role</DropdownMenuLabel>
                                    <DropdownMenuItem
                                        onClick={() => handleRoleChange("user")}
                                        disabled={user.role === "user" || user.id === currentUser?.id}
                                    >
                                        <UserIcon className="mr-2 h-4 w-4" />
                                        User
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => handleRoleChange("moderator")}
                                        disabled={user.role === "moderator" || user.id === currentUser?.id}
                                    >
                                        <Shield className="mr-2 h-4 w-4" />
                                        Moderator
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => handleRoleChange("admin")}
                                        disabled={user.role === "admin" || user.id === currentUser?.id}
                                    >
                                        <Crown className="mr-2 h-4 w-4" />
                                        Admin
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={handleDeleteUser}
                                        disabled={user.id === currentUser?.id}
                                        className="text-red-600 focus:text-red-600"
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete User Permanently
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div> */}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default UserProfileHeader
