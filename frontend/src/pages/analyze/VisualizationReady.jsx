import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ChartSelector } from './assets/ChartSelector'
import { useAuth } from '@/lib/auth-context'
import Available from './AiInsights/Available'
import NotAvailable from './AiInsights/NotAvailable'
import VisualizationDisplay from './assets/VisualizationDisplay'

const Done = ({setVisualizationReady}) => {

  const [chartType, setChartType] = useState("bar")
  const [viewMode, setViewMode] = useState("2d")
  const [chartData, setChartData] = useState()
  const {isAuthenticated}=useAuth()


  return (
    <div className='space-y-8'>
      <div className='grid grids-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2'>
          <Card>
            <CardContent className="pt-6">
              <div className='space-y-6'>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Visualization Results</h2>
                  <Button variant="outline" size="sm" onClick={() => setVisualizationReady(false)}>
                    Upload New File
                  </Button>
                </div>

                <Tabs
                  defaultValue="2d"
                  className="w-full"
                  onValueChange={(value) => setViewMode(value)}
                >

                  <div className="flex justify-between items-center mb-4">
                    <TabsList>
                      <TabsTrigger value="2d">2D View</TabsTrigger>
                      <TabsTrigger value="3d">3D View</TabsTrigger>
                    </TabsList>

                    <ChartSelector viewMode={viewMode} currentChart={chartType} onChartChange={setChartType} />
                  </div>


                  <TabsContent value="2d" className="mt-0">
                    <div className="border rounded-lg p-4 bg-gray-50 flex items-center justify-center min-h-[500px]">
                      <VisualizationDisplay chartType={chartType}  /> 
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-end gap-2 ">
                  <Button variant="outline" className="cursor-pointer">Download as PNG</Button>
                  <Button variant="outline" className="cursor-pointer">Download as PDF</Button>
                  {isAuthenticated && (
                    <Button className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer">Save Visualization</Button>
                  )}
                </div>

              </div>
            </CardContent>
          </Card>
        </div>

        <div className='lg:col-span-1'>
            {isAuthenticated? <Available/> : <NotAvailable/>}
        </div>
      </div>
    </div>
  )
}

export default Done
