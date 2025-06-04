import React, { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import FilesList from './filesTab/FilesList'
import { axiosInstance } from '../../../../utils/axios.js'

const FilesAndProjects = ({files,setFiles,projects, setAllProjects}) => {


    const handleFileAction = (file, action) => {
    // setSelectedFile(file)
    // setActionType(action)
    // setIsActionDialogOpen(true)
    console.log("this is fileaction")
  }


    return (
        <div>
            <Tabs defaultValue="files" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="files">Files ({files.length})</TabsTrigger>

                    <TabsTrigger value="projects">Projects ({projects.length})</TabsTrigger>
                    
                </TabsList>

                <TabsContent value="files" className="space-y-4">
                    <Tabs defaultValue="active" className="w-full">
                        <TabsList>
                            <TabsTrigger value="active">Total Files ({files.length})</TabsTrigger>
                        </TabsList>

                        <TabsContent value="active">
                            <FilesList files={files} setFiles={setFiles} onFileAction={handleFileAction} />
                        </TabsContent>

                    
                    </Tabs>
                </TabsContent>

                {/* <TabsContent value="projects">
                    <div className="space-y-4">
                        {projects.length > 0 ? (
                            projects.map((project) => (
                                <Card key={project.id}>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-lg">{project.name}</CardTitle>
                                            <Badge variant="outline">{project.fileCount} files</Badge>
                                        </div>
                                        <p className="text-sm text-gray-600">{project.description}</p>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <Calendar className="h-4 w-4 mr-1" />
                                                <span>Created: {project.createdAt}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Calendar className="h-4 w-4 mr-1" />
                                                <span>Updated: {project.updatedAt}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <FolderOpen className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                                <p>No projects found</p>
                            </div>
                        )}
                    </div>
                </TabsContent> */}
            </Tabs>
        </div>

  )
}

export default FilesAndProjects
