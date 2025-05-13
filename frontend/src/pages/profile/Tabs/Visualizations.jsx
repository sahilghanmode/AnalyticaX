import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  BarChart,
  FileSpreadsheet
} from "lucide-react"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const Visualizations = () => {
    const visualizationHistory = [
        {
        id: 1,
        name: "Q1 Sales Analysis",
        date: "May 10, 2025",
        type: "Bar Chart",
        fileName: "sales_q1_2025.xlsx",
        project: "Q2 2025 Financial Analysis",
        },
        {
        id: 2,
        name: "Customer Demographics",
        date: "May 5, 2025",
        type: "Pie Chart",
        fileName: "customer_data.xlsx",
        project: "Customer Demographics Study",
        },
        {
        id: 3,
        name: "Product Performance",
        date: "April 28, 2025",
        type: "Line Chart",
        fileName: "product_metrics.xlsx",
        project: null,
        },
    ]

    return (
        <div className='space-y-4'>
            <h2 className="text-2xl font-bold mb-4">Your Visualizations</h2>
              {visualizationHistory.length > 0 ? (
                visualizationHistory.map((viz) => (
                  <Card key={viz.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                          <BarChart className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-lg">{viz.name}</h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
                            <div className="flex items-center">
                              <span>Created: {viz.date}</span>
                            </div>
                            <div className="flex items-center">
                              <span>Type: {viz.type}</span>
                            </div>
                            <div className="flex items-center">
                              <FileSpreadsheet className="h-4 w-4 mr-1" />
                              <span>{viz.fileName}</span>
                            </div>
                          </div>
                          {viz.project && (
                            <div className="mt-2">
                              <Badge variant="secondary" className="text-xs">
                                Project: {viz.project}
                              </Badge>
                            </div>
                          )}
                        </div>
                        <Button variant="outline" size="sm" onClick={() => router.push(`/analyze?id=${viz.id}`)}>
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
                  <BarChart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No visualizations yet</h3>
                  <p className="text-gray-500 mt-1 mb-4">Upload your first Excel file to create a visualization</p>
                  <Button className="bg-emerald-500 hover:bg-emerald-600" onClick={() => router.push("/analyze")}>
                    Create Visualization
                  </Button>
                </div>
            )}
        </div>
    )
}

export default Visualizations
