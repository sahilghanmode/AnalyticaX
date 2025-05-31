import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  BarChart,
  FileSpreadsheet,
  Plus
} from "lucide-react"
import { useNavigate } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const Visualizations = ({visualizationHistory}) => {
  const navigate=useNavigate()

  return (
    <div className='space-y-4'>
      <div className='flex justify-between'>
        <h2 className="text-2xl font-bold mb-4">Your Visualizations</h2>
        <Button variant="outline" size="sm"
        //  onClick={() => setVisualizationReady(false)}
        className="cursor-pointer"
         >
          Upload New File
        </Button>
      </div>

      {visualizationHistory.length > 0 ? (
        visualizationHistory.map((viz) => (
          <Card key={viz._id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <BarChart className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{viz.file.fileName}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
                    <div className="flex items-center">
                      <span>Created: {new Date(viz.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <span>Type: {viz.chartType}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      X-axis :
                      <span className='ml-1'>
                        { viz.xAxisKey}
                      </span>
                      Y-axis :
                      <span className='ml-1'>
                        { viz.yAxisKey}
                      </span>
                      {viz.is3d && (
                        <div>
                          Z-axis :
                          <span className='ml-1'>
                            {viz.zAxisKey}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* {viz.project && (
                    <div className="mt-2">
                      <Badge variant="secondary" className="text-xs">
                        Project: {viz.project}
                      </Badge>
                    </div>
                  )} */}
                </div>
                <Button variant="outline" className="cursor-pointer" size="sm" onClick={() =>navigate(`/analyze?id=${viz._id}`) }>
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
          <Button className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer" onClick={() => navigate('/analyze')}>
            Create Visualization
          </Button>
        </div>
      )}
    </div>
  )
}

export default Visualizations
