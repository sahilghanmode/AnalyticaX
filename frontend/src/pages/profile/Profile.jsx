import React from 'react'
import { Button } from '@/components/ui/button'
import ProfileHeader from './ProfileHeader'
import Projects from './Tabs/Projects'
import Visualizations from './Tabs/Visualizations'
import ProfileTop from './ProfileTop'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"




const Profile = () => {
    const [activeTab, setActiveTab] = useState("visualizations")

  return (
    <div className="min-h-screen flex flex-col">
        <ProfileHeader/>
        <main className="flex-1 container mx-auto px-4 py-12">
            <div className="max-w-5xl mx-auto">
                <ProfileTop/>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full ">
                    <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-8 cursor-pointer">
                        <TabsTrigger value="projects">Projects</TabsTrigger>
                        <TabsTrigger value="visualizations">Visualizations</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>

                    <TabsContent value="projects" className="space-y-6">
                        <Projects/>
                    </TabsContent>
                    <TabsContent value="visualizations" >
                        <Visualizations/>
                    </TabsContent>
                </Tabs>
            </div>
            
        </main>
        
    </div>
  )
}

export default Profile
