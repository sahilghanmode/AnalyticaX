import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ChartSelector } from './assets/ChartSelector'
import { useAuth } from '@/lib/auth-context'
import Available from './AiInsights/Available'
import NotAvailable from './AiInsights/NotAvailable'
import VisualizationDisplay from './assets/VisualizationDisplay'
import { ThreeDGraph } from './assets/ThreeDGraph'
import domtoimage from 'dom-to-image'
import { PDFDocument } from 'pdf-lib'
import { useExcelData } from '@/lib/excel-context'
import { axiosInstance } from '../../../utils/axios.js'
import { toast } from 'sonner'

const Done = ({ setVisualizationReady }) => {

  const [chartType, setChartType] = useState("bar")
  const [viewMode, setViewMode] = useState("2d")
  const { isAuthenticated, user } = useAuth()
  const [xAxisColumn, setXAxisColumn] = useState('')
  const [yAxisColumn, setYAxisColumn] = useState('')
  const [zAxisColumn, setZAxisColumn] = useState('')
  const [availableColumns, setAvailableColumns] = useState([])
  const { data, file } = useExcelData()


  useEffect(() => {
    if (data && data.length > 0) {
      const columns = Object.keys(data[0]);
      if (columns.length >= 2) {
        setAvailableColumns(columns);
        setXAxisColumn((prev) => prev || columns[0]);
        setYAxisColumn((prev) => prev.length > 0 ? prev : [columns[1]]);
      }
    }
  }, [data])

  const downloadPNG = () => {
    const node = document.getElementById('visualization-container');
    if (!node) return;

    domtoimage.toPng(node)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'visualization.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error('Failed to download PNG:', error);
      });
  };

  const downloadPDF = async () => {
    const node = document.getElementById('visualization-container');
    if (!node) return;

    try {
      const imageDataUrl = await domtoimage.toPng(node);
      const imageBytes = await fetch(imageDataUrl).then(res => res.arrayBuffer());

      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();

      const pngImage = await pdfDoc.embedPng(imageBytes);
      const { width, height } = pngImage.scale(1);

      page.setSize(width, height);
      page.drawImage(pngImage, { x: 0, y: 0, width, height });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'visualization.pdf';
      link.click();
    } catch (error) {
      console.error('Failed to download better PDF:', error);
    }
  }

  const handleAxisChange = (axis, column) => {
    if (axis === "x") {
      setXAxisColumn(column);

    } else {
      setYAxisColumn(column);

    }
  }


  const handleSaveVisualization = async () => {
    try {
      const is3d = (viewMode === "3d")
      const fileName = file.name
      let yAxisKey;
      if (Array.isArray(yAxisColumn)) {
        yAxisKey = yAxisColumn[0];  // first element if array
      } else {
        yAxisKey = yAxisColumn;     // already string
      }

      const userId = user._id
      const body = {
        chartType,
        is3d,
        xAxisKey: xAxisColumn,
        yAxisKey,
        zAxisKey: zAxisColumn,
        fileName,
        userId

      }
      const res = await axiosInstance.post("/file/saveVisualization", body)

      if (res.status == 400) {
        toast.message("visualization already exists")
      }
      if (res.status == 200) {
        toast.message("visualization saved successfully")
      }
    } catch (error) {
      
    }
  }

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
                  value={viewMode}
                  className="w-full"
                  onValueChange={(value) => setViewMode(value)}
                >

                  <div className="flex justify-between items-center mb-4">
                    <TabsList>
                      <TabsTrigger value="2d" >2D View</TabsTrigger>
                      <TabsTrigger value="3d" >3D View</TabsTrigger>
                    </TabsList>

                    <ChartSelector viewMode={viewMode} currentChart={chartType} onChartChange={setChartType} />
                  </div>

                  {viewMode === "2d" && (
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                      <div className="flex-1">
                        <label htmlFor="x-axis" className="block text-sm font-medium text-gray-700 mb-1">
                          X-Axis
                        </label>
                        <select
                          id="x-axis"
                          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                          value={xAxisColumn}
                          onChange={(e) => handleAxisChange("x", e.target.value)}
                        >
                          {availableColumns.map((column) => (
                            <option key={`x-${column}`} value={column}>
                              {column}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex-1">
                        <label htmlFor="y-axis" className="block text-sm font-medium text-gray-700 mb-1">
                          Y-Axis
                        </label>
                        <select
                          id="y-axis"
                          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                          value={yAxisColumn}
                          onChange={(e) => handleAxisChange("y", e.target.value)}
                        >
                          {availableColumns.map((column) => (
                            <option key={`y-${column}`} value={column}>
                              {column}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {viewMode === "3d" && (
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                      <div className="flex-1">
                        <label htmlFor="x-axis" className="block text-sm font-medium text-gray-700 mb-1">
                          X-Axis
                        </label>
                        <select
                          id="x-axis"
                          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                          value={xAxisColumn}
                          onChange={(e) => handleAxisChange("x", e.target.value)}
                        >
                          {availableColumns.map((column) => (
                            <option key={`x-${column}`} value={column}>
                              {column}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex-1">
                        <label htmlFor="y-axis" className="block text-sm font-medium text-gray-700 mb-1">
                          Y-Axis
                        </label>
                        <select
                          id="y-axis"
                          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                          value={yAxisColumn}
                          onChange={(e) => handleAxisChange("y", e.target.value)}
                        >
                          {availableColumns.map((column) => (
                            <option key={`y-${column}`} value={column}>
                              {column}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex-1">
                        <label htmlFor="z-axis" className="block text-sm font-medium text-gray-700 mb-1">
                          Z-Axis
                        </label>
                        <select
                          id="z-axis"
                          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                          value={zAxisColumn}
                          onChange={(e) => handleAxisChange("z", e.target.value)}
                        >
                          {availableColumns.map((column) => (
                            <option key={`z-${column}`} value={column}>
                              {column}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}



                  <TabsContent value="2d" className="mt-0" >
                    <div id="visualization-container" className="border rounded-lg p-4 bg-gray-50 flex items-center justify-center min-h-[500px]">
                      <VisualizationDisplay chartType={chartType} xAxisColumn={xAxisColumn} yAxisColumn={[yAxisColumn]} />
                    </div>
                  </TabsContent>

                  <TabsContent value="3d" className="mt-0">
                    <div className='border rounded-lg w-full p-4 bg-gray-50 flex items-center justify-center min-h-[500px]'>
                      <ThreeDGraph />
                    </div>
                  </TabsContent>
                </Tabs>

                {viewMode === "2d" && <div className="flex justify-end gap-2 ">
                  <Button variant="outline" className="cursor-pointer" onClick={downloadPNG}>Download as PNG</Button>
                  <Button variant="outline" className="cursor-pointer" onClick={downloadPDF}>Download as PDF</Button>
                  {isAuthenticated && (
                    <Button className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer" onClick={handleSaveVisualization} >Save Visualization</Button>
                  )}
                </div>}

                {viewMode === "3d" && <div className="flex justify-end gap-2 ">
                  <Button variant="outline" className="cursor-pointer">Download as 3D</Button>
                  {isAuthenticated && (
                    <Button className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer" onClick={handleSaveVisualization} >Save Visualization</Button>
                  )}
                </div>}

              </div>
            </CardContent>
          </Card>
        </div>

        <div className='lg:col-span-1'>
          {isAuthenticated ? <Available /> : <NotAvailable />}
        </div>
      </div>
    </div>
  )
}

export default Done
