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

const allUsers = [
    {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "admin",
        status: "active",
        createdAt: "2025-01-15",
        lastLogin: "2025-05-28",
        image: "/placeholder.svg?height=40&width=40",
    },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "user",
        status: "active",
        createdAt: "2025-02-20",
        lastLogin: "2025-05-27",
    },
    {
        id: "3",
        name: "Mike Johnson",
        email: "mike@example.com",
        role: "moderator",
        status: "active",
        createdAt: "2025-03-10",
        lastLogin: "2025-05-26",
    },
    {
        id: "4",
        name: "Sarah Wilson",
        email: "sarah@example.com",
        role: "user",
        status: "inactive",
        createdAt: "2025-04-05",
        lastLogin: "2025-05-20",
    },
    {
        id: "5",
        name: "David Brown",
        email: "david@example.com",
        role: "user",
        status: "suspended",
        createdAt: "2025-01-30",
        lastLogin: "2025-05-15",
    },
    {
        id: "6",
        name: "Alex Johnson",
        email: "alex@example.com",
        role: "user",
        status: "banned",
        createdAt: "2025-03-15",
        lastLogin: "2025-04-10",
    },
];


const UserTab = () => {
    const navigate=useNavigate()

    const getInitials = (user) => {
        if (user.name) {
            return user.name
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

    const getStatusBadgeVariant = (status) => {
        switch (status) {
            case "active":
                return "default"
            case "inactive":
                return "secondary"
            case "suspended":
                return "destructive"
            case "banned":
                return "destructive"
            default:
                return "outline"
        }
    }

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
                                    <th className="text-left py-3 px-4 font-medium">Last Login</th>
                                    <th className="text-right py-3 px-4 font-medium">Details</th>
                                </tr>
                            </thead>

                            <tbody>
                                {allUsers.map((user) => (
                                    <tr key={user.id} className="border-b hover:bg-gray-50">
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage src={user.image || ""} alt={user.name || user.email} />
                                                    <AvatarFallback>{getInitials(user)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium">{user.name || "No name"}</div>
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
                                            <Badge variant={getStatusBadgeVariant(user.status)} className="w-fit">
                                                {user.status}
                                            </Badge>
                                        </td>

                                        <td className="py-3 px-4 text-sm text-gray-500">{user.createdAt}</td>
                                        <td className="py-3 px-4 text-sm text-gray-500">{user.lastLogin}</td>

                                        <td className="py-3 px-4 text-right">
                                            <div className="flex items-center gap-2 justify-end">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => navigate(`/admin/user/${user.id}`)}
                                                    className="flex items-center gap-1"
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
