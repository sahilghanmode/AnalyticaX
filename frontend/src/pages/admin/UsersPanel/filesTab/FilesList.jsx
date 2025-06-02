import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { 
  MoreHorizontal,
  Archive,
  FileSpreadsheet,
  Trash2,
  RotateCcw
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const FilesList = ({files}) => {


  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  function formatTimestamp(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  return (
    <div className="space-y-3">
      {files.map((file) => (
        <Card key={file._id} className={file.isArchived  === true ? "bg-gray-50" : ""}>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="h-5 w-5 text-green-600" />
                <div>
                  <h4 className="font-medium">{file.fileName}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>
                      {/* {formatFileSize(file.size)} */}
                      {formatFileSize(50000)}
                    </span>
                    <span>Uploaded: {formatTimestamp(file.uploadedAt)}</span>
                    {file.projectName && <span>Project: {file.projectName}</span>}
                    {/* {file.visualizationType && <span>Type: {file.visualizationType}</span>} */}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {file.isArchived && <Badge variant="secondary" >Archived</Badge>}
                {!file.isArchived && <Badge variant="default">Active</Badge> }
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>File Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {file.isArchived == false && (
                      <>
                        <DropdownMenuItem onClick={() => onFileAction(file, "archive")}>
                          <Archive className="mr-2 h-4 w-4" />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onFileAction(file, "delete")} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </>
                    )}
                    {file.isArchived == true && (
                      <>
                        <DropdownMenuItem onClick={() => onFileAction(file, "unarchive")}>
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Unarchive
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onFileAction(file, "delete")} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Permanently
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default FilesList
