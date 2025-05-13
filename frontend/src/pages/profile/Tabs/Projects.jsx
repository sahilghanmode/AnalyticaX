import React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
    Plus,
    FolderKanban,
    ChevronDown,
    ChevronRight,
    Calendar,
    LayoutGrid,
    FileUp,
    FileSpreadsheet
 } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const Projects = () => {
    const [openProjectId, setOpenProjectId] = useState(null);

    const projectsData = [
        {
        id: 1,
        name: "Q2 2025 Financial Analysis",
        description: "Comprehensive analysis of Q2 2025 financial performance",
        createdAt: "May 8, 2025",
        updatedAt: "May 12, 2025",
        visualizations: [
            {
            id: 101,
            name: "Revenue by Department",
            type: "Bar Chart",
            createdAt: "May 8, 2025",
            fileName: "revenue_by_dept_q2.xlsx",
            },
            {
            id: 102,
            name: "Expense Distribution",
            type: "Pie Chart",
            createdAt: "May 9, 2025",
            fileName: "expenses_q2.xlsx",
            },
            {
            id: 103,
            name: "Profit Margin Trends",
            type: "Line Chart",
            createdAt: "May 12, 2025",
            fileName: "profit_margins_q2.xlsx",
            },
        ],
        },
        {
        id: 2,
        name: "Customer Demographics Study",
        description: "Analysis of customer demographics and purchasing patterns",
        createdAt: "April 25, 2025",
        updatedAt: "May 5, 2025",
        visualizations: [
            {
            id: 201,
            name: "Age Distribution",
            type: "Pie Chart",
            createdAt: "April 25, 2025",
            fileName: "age_distribution.xlsx",
            },
            {
            id: 202,
            name: "Purchase Frequency by Region",
            type: "Bar Chart",
            createdAt: "May 1, 2025",
            fileName: "regional_purchases.xlsx",
            },
        ],
        },
    ]

  return (
    <div className='space-y-6'>
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Your Projects</h2>
            <Button className="bg-emerald-500 hover:bg-emerald-600">
                <Plus className="h-4 w-4 mr-2 " />
                New Project
            </Button>
        </div>

              {projectsData.length > 0 ? (
                <div className="space-y-4">
                  {projectsData.map((project) => (
                    <Card key={project.id} className="overflow-hidden">
                      <Collapsible
                        open={openProjectId === project.id}
                        onOpenChange={() => setOpenProjectId(openProjectId === project.id ? null : project.id)}
                      >
                        <div className="flex items-center p-6">
                          <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 mr-4">
                            <FolderKanban className="h-6 w-6 text-emerald-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-lg">{project.name}</h3>
                              <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  {openProjectId === project.id ? (
                                    <ChevronDown className="h-4 w-4" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4" />
                                  )}
                                </Button>
                              </CollapsibleTrigger>
                            </div>
                            <p className="text-sm text-gray-500">{project.description}</p>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-500">
                              <div className="flex items-center">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                <span>Created: {project.createdAt}</span>
                              </div>
                              <div className="flex items-center">
                                <LayoutGrid className="h-3.5 w-3.5 mr-1" />
                                <span>{project.visualizations.length} visualizations</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <CollapsibleContent>
                          <div className="px-6 pb-6 pt-2 border-t">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-medium">Visualizations in this project</h4>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                                onClick={() => handleAddFile(project.id)}
                              >
                                <FileUp className="h-3.5 w-3.5 mr-1.5" />
                                Add File
                              </Button>
                            </div>

                            <div className="space-y-3">
                              {project.visualizations.map((viz) => (
                                <div
                                  key={viz.id}
                                  className="flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                                >
                                  <div className="h-8 w-8 rounded-md bg-white border flex items-center justify-center flex-shrink-0 mr-3">
                                    <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                      <h5 className="font-medium text-sm truncate">{viz.name}</h5>
                                      <Badge variant="outline" className="ml-2 text-xs">
                                        {viz.type}
                                      </Badge>
                                    </div>
                                    <p className="text-xs text-gray-500 truncate">{viz.fileName}</p>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="ml-2"
                                    onClick={() => router.push(`/analyze?id=${viz.id}`)}
                                  >
                                    View
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
                  <FolderKanban className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No projects yet</h3>
                  <p className="text-gray-500 mt-1 mb-4">Create your first project to organize your visualizations</p>
                  <Button className="bg-emerald-500 hover:bg-emerald-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Project
                  </Button>
                </div>
              )}
    </div>
  )
}

export default Projects
