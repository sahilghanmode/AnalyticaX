import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import Overview from './Tabs/Overview'
import UserTab from './Tabs/UserTab'

const DashboardMain = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [activeTab, setActiveTab] = useState("overview")

    return (
        <div className="flex-1 container mx-auto px-4 py-8">
            <div className='max-w-7xl mx-auto'>
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                        <p className="text-gray-600 mt-1">Manage users and monitor system activity</p>
                    </div>
                    <Button
                        //   onClick={loadUsers} 
                        disabled={isLoading} variant="outline">
                        <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                        Refresh
                    </Button>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" >
                    <TabsList className="grid grid-cols-2 w-full max-w-md mb-8">
                        <TabsTrigger value="overview" className="cursor-pointer" >Overview</TabsTrigger>
                        <TabsTrigger value="users" className="cursor-pointer" >Users</TabsTrigger>
                        {/* <TabsTrigger value="activity">Activity</TabsTrigger> */}
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        <Overview />
                    </TabsContent>

                    <TabsContent value="users">
                        {isLoading ? (
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-center py-8">
                                        <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
                                        <span className="ml-2 text-gray-600">Loading users...</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <UserTab/>
                        )}
                    </TabsContent>
                </Tabs>

            </div>
        </div>
    )
}

export default DashboardMain
