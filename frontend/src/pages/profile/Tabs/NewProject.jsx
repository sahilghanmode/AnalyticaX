import React, { useState, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { FileUp, Loader2, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { axiosInstance } from '../../../../utils/axios.js'
import { useAuth } from '@/lib/auth-context'

const NewProject = ({open, onOpenChange}) => {
    const {user}=useAuth()

    const [isLoading, setIsLoading]=useState(false)
    const [projectDetails, setProjectDetails]=useState({
        name:"",
        description:"",
    })
    const [files, setFiles]=useState([])
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files).filter((file) => isExcelFile(file));
            
            if (newFiles.length !== e.target.files.length) {
            toast({
                title: "Invalid file type",
                description: "Only Excel files (.xls, .xlsx, .csv) are supported.",
                variant: "destructive",
            });
            }

            setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        }

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    const isExcelFile = (file) => {
        const allowedTypes = [
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "text/csv"
        ];
        return allowedTypes.includes(file.type);
    }

    const removeFile = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        setIsLoading(true)

        try {
            if (files.length === 0) {
                alert("Please upload at least one file");
                setIsLoading(false);
                return;
            }
            const uploadedFileNames = [];

            for (const file of files) {
                const formData = new FormData();
                formData.append('excelFile', file);

                const res = await axiosInstance.post('/file/uploadfile', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })

                if (res.data.success) {
                    uploadedFileNames.push(res.data.fileName)
                } else {
                    throw new Error('File upload failed');
                }
            }

            const projectPayload = {
                name: projectDetails.name,
                description: projectDetails.description,
                fileNames: uploadedFileNames,  // send array of stored filenames
                userId:user._id
            };
            
            const createRes=await axiosInstance.post("/project/createproject",projectPayload)

            if(createRes.data.success){
                toast.success("Project created successfully")
                setFiles([]);
                setProjectDetails({ name: "", description: "" })
            }else{
                toast.error(createRes.data.message)
            }
            onOpenChange(false)

        } catch (error) {
            console.log("error in handlesubmit function",{error})
        }finally{
            setIsLoading(false)
        }
    }


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>Create a new project to organize your data visualizations.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="projectName" className="text-sm font-medium">
                Project Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="projectName"
                value={projectDetails.name}
                onChange={(e) => setProjectDetails({ ...projectDetails, name: e.target.value })}
                placeholder="Q2 2025 Financial Analysis"
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="projectDescription" className="text-sm font-medium">
                Description
              </Label>
              <textarea
                id="projectDescription"
                value={projectDetails.description}
                onChange={(e) => setProjectDetails({ ...projectDetails, description: e.target.value })}
                placeholder="Describe the purpose of this project..."
                className="w-full min-h-[80px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm mt-1"
              />
            </div>

            <div>
              <Label className="text-sm font-medium">Add Files (Optional)</Label>
              <div
                className="border-2 border-dashed rounded-lg p-6 mt-1 text-center"
                // onDragOver={handleDragOver}
                // onDrop={handleDrop}
              >
                <div className="flex items-center justify-center">
                  <FileUp className="h-8 w-8 text-gray-400" />
                </div>
                <p className="mt-2">Drag and drop your Excel files here, or click to browse</p>
                <p className="text-xs text-gray-500 mt-1">Supports .xls, .xlsx, and .csv files</p>
                <Button variant="outline" className="mt-4 relative">
                  Browse Files
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                    accept=".xls,.xlsx,.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
                    multiple
                  />
                </Button>
              </div>
            </div>

            {files.length > 0 && (
              <div>
                <Label className="text-sm font-medium">Selected Files ({files.length})</Label>
                <div className="mt-2 space-y-2 max-h-[200px] overflow-y-auto">
                  {files.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
                    >
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-md bg-emerald-100 flex items-center justify-center flex-shrink-0 mr-3">
                          <FileUp className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium truncate max-w-[250px]">{file.name}</p>
                          <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-gray-500 hover:text-red-500 cursor-pointer"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove file</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="cursor-pointer">
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Project
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NewProject
