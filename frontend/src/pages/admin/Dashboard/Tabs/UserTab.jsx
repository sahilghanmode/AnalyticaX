import React from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import {
    Crown,
    Shield,
    UserIcon,
    ExternalLink
} from 'lucide-react';
import { useAdminData } from '@/lib/admin-context'



const UserTab = () => {
    const {allUsers}=useAdminData()
    const navigate=useNavigate()

    const getInitials = (user) => {
        if (user.fullName) {
            return user.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase();
        }
        return user.email.charAt(0).toUpperCase();
    };

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

    const getStatusBadgeVariant = (suspended) => {

        if(suspended){
            return "default"
        }else{
            return "destructive"
        }
    }

    const formatDateTime = (dateInput) => {
        const date = new Date(dateInput);

        if (isNaN(date.getTime())) return 'Invalid Date';

        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',  // e.g., Jan, Feb
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true     // for AM/PM format
        });
    };


    return (
        <div>
            <Card>
                <CardHeader>
                    User Management
                </CardHeader>

                <CardContent>
                    <div>
                        <table className='w-full'>
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4 font-medium">User</th>
                                    <th className="text-left py-3 px-4 font-medium">Role</th>
                                    <th className="text-left py-3 px-4 font-medium">Status</th>
                                    <th className="text-left py-3 px-4 font-medium">Created</th>
                                    <th className="text-left py-3 px-4 font-medium">Last Updated</th>
                                    <th className="text-right py-3 px-4 font-medium">Details</th>
                                </tr>
                            </thead>

                            <tbody>
                                {allUsers.map((user) => (
                                    <tr key={user.id} className="border-b hover:bg-gray-50">
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage src={user.image || ""} alt={user.fullName || user.email} />
                                                    <AvatarFallback>{getInitials(user)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium">{user.fullName || "No name"}</div>
                                                    <div className="text-sm text-gray-500">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="py-3 px-4">
                                            <Badge variant={getRoleBadgeVariant(user.role)} className="flex items-center gap-1 w-fit">
                                                {getRoleIcon(user.role)}
                                                {user.role}
                                            </Badge>
                                        </td>

                                        <td className="py-3 px-4">
                                            <Badge variant={getStatusBadgeVariant(user.suspended)} className="w-fit">
                                                {user.suspended==true? "Suspended" :"active" }
                                            </Badge>
                                        </td>

                                        <td className="py-3 px-4 text-sm text-gray-500">{formatDateTime(user.createdAt)}</td>
                                        <td className="py-3 px-4 text-sm text-gray-500">{formatDateTime(user.updatedAt)}</td>

                                        <td className="py-3 px-4 text-right">
                                            <div className="flex items-center gap-2 justify-end">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => navigate(`/admin/user/${user._id}`)}
                                                    className="flex items-center gap-1 cursor-pointer"
                                                >
                                                    <ExternalLink className="h-3 w-3" />
                                                    View Details
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default UserTab
