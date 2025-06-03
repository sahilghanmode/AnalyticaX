import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { FileSpreadsheet, FolderOpen, HardDrive, BarChart3} from 'lucide-react'

const StatisticsCards = ({files}) => {

    const formatFileSize = (bytes) => {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const sizes = ["Bytes", "KB", "MB", "GB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    }

  return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
            <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">Total Files</p>
                    <p className="text-2xl font-bold">{files.length}</p>
                </div>
                <FileSpreadsheet className="h-8 w-8 text-blue-600" />
                </div>
            </CardContent>
            </Card>

            <Card>
            <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">Projects</p>
                    <p className="text-2xl font-bold">2</p>
                </div>
                <FolderOpen className="h-8 w-8 text-green-600" />
                </div>
            </CardContent>
            </Card>

            <Card>
            <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">Storage Used</p>
                    <p className="text-2xl font-bold">{formatFileSize(5000)}</p>
                </div>
                <HardDrive className="h-8 w-8 text-purple-600" />
                </div>
            </CardContent>
            </Card>

            <Card>
            <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">Active Files</p>
                    <p className="text-2xl font-bold">2</p>
                </div>
                <BarChart3 className="h-8 w-8 text-emerald-600" />
                </div>
            </CardContent>
            </Card>
        </div>
  )
}

export default StatisticsCards
