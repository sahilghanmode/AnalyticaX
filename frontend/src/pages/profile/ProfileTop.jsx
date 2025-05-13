import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'


const ProfileTop = () => {
    const user = JSON.parse(localStorage.getItem("user"));


    const initials = user && user.fullName
        ? user.fullName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
        : (user && user.email ? user.email.charAt(0).toUpperCase() : "U");


  return (
    <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="md:w-1/3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={user?.image || ""} alt={user?.fullName || user?.email || ""} />
                      <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-2xl font-bold">{user?.fullName || "User"}</h2>
                    <p className="text-gray-500">{user?.email}</p>
                    <Button className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600">Edit Profile</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="md:w-2/3">
              <Card>
                <CardHeader>
                  <CardTitle>Account Overview</CardTitle>
                  <CardDescription>View and manage your account details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" value={user?.fullName || ""} readOnly className="bg-gray-50" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" value={user?.email} readOnly className="bg-gray-50" />
                      </div>
                    </div>
                    <div>
                      <Label>Account Type</Label>
                      <div className="flex items-center mt-1">
                        <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Free
                        </span>
                        <Button variant="link" className="text-sm h-auto p-0 ml-2">
                          Upgrade to Pro
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label>Member Since</Label>
                      <p className="text-sm text-gray-500 mt-1">May 1, 2025</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
  )
}

export default ProfileTop
