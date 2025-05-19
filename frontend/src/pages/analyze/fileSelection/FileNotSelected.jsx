import React from 'react'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'

const FileNotSelected = ({setFile,file}) => {

  const isExcelFile = (file) => {
    const validTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ]
    return (
      validTypes.includes(file.type) ||
      file.name.endsWith(".xls") ||
      file.name.endsWith(".xlsx") ||
      file.name.endsWith(".csv")
    )
  }

  const handleFileChange=(e)=>{
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      if (isExcelFile(selectedFile)) {
        setFile(selectedFile)
      } else {
        alert("Please upload an Excel file (.xls, .xlsx, or .csv)")
      }
    }
  }
  return (
    <div className="space-y-4">
        <div className="flex items-center justify-center">
            <Upload className="h-12 w-12 text-gray-400" />
        </div>
        <p className="text-lg">Drag and drop your Excel file here, or click to browse</p>
        <p className="text-sm text-gray-500">Supports .xls, .xlsx, and .csv files</p>
        <Button variant="outline" className="relative cursor-pointer">
            Browse Files
            <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
            accept=".xls,.xlsx,.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
            />
        </Button>
    </div>
  )
}

export default FileNotSelected
