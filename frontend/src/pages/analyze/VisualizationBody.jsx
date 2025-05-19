import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import FileSelected from './fileSelection/FileSelected'
import FileNotSelected from './fileSelection/FileNotSelected'
import { useAuth } from '@/lib/auth-context'
import { Sparkles, AlertCircle } from 'lucide-react'

const NotReady = () => {
    const [file,setFile]=useState(null)
    const {isAuthenticated}=useAuth()

  return (
    <div className='space-y-8'>
      <Card>
        <CardContent className="pt-6">
            <div className='border-2 border-dashed rounded-lg p-12 text-center border-gray-300 transition-colors'>
                {file ? <FileSelected file={file}/> : <FileNotSelected setFile={setFile} file={file} /> }
            </div>

            {isAuthenticated ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-start gap-3 mt-5">
                  <Sparkles className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-emerald-800">AI-powered insights available</h3>
                    <p className="text-emerald-700 text-sm mt-1">
                      Upload your Excel file to get AI-generated insights and recommendations about your data.
                    </p>
                  </div>
                </div>
            ) :(
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3 mt-5`">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-amber-800">Sign in to access all features</h3>
                    <p className="text-amber-700 text-sm mt-1">
                      Create an account or log in to save your visualizations and get AI-powered data insights.
                    </p>
                  </div>
                </div>
              )
            }
        </CardContent>
      </Card>
    </div>
  )
}

export default NotReady
