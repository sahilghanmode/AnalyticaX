import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FileSpreadsheet, RefreshCw } from 'lucide-react'
import { axiosInstance } from '../../../../utils/axios.js'
import { useExcelData } from '@/lib/excel-context.jsx'


const FileSelected = ({  setVisualizationReady }) => {
  const { setData, file,setFile } = useExcelData()
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('excelFile', file) // 'excelFile' must match backend multer field name

      const res = await axiosInstance.post("/file/uploadfile", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })

      const result = res.data
      if (!result.success) throw new Error(result.message || 'Upload failed')

      setData(result.data)
      console.log('Parsed Excel data:', result.data)
    } catch (error) {
      console.error('Upload error:', error.message)
      alert('Failed to upload or parse the Excel file.')
    } finally {
      setIsUploading(false)
      setVisualizationReady(true)
    }
  }

  const handleUploadAnother = () => {
    setFile(null)
  }


  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center">
        <FileSpreadsheet className="h-12 w-12 text-emerald-500" />
      </div>
      <div>
        <p className="text-lg font-medium">{file.name}</p>
        <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
      </div>
      <Button
        className="bg-emerald-500 hover:bg-emerald-600 w-full cursor-pointer"
        onClick={handleUpload}
        disabled={isUploading}
      >
        {isUploading ? "Processing..." : "Generate Visualization"}
      </Button>

      <Button variant="outline" className="flex items-center w-full cursor-pointer" onClick={handleUploadAnother}>
        <RefreshCw className="h-4 w-4 mr-2" />
        Upload Another File
      </Button>
    </div>
  )
}

export default FileSelected
