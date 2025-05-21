import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, FileSpreadsheet } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { useExcelData } from "@/lib/excel-context"

export function DataSummary({ summary,isLoading }) {
    const {file}=useExcelData()
    const fileName=file.name


  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-emerald-500" />
          AI Data Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-emerald-500 animate-spin" />
              </div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2.5"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <p className="text-gray-500 mt-4">Analyzing your data...</p>
          </div>
        ) : summary ? (
          <div className="prose prose-sm max-w-none">
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <FileSpreadsheet className="h-4 w-4 mr-1" />
              <span className="truncate">{fileName}</span>
            </div>
            <ReactMarkdown>{summary}</ReactMarkdown>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Sparkles className="h-12 w-12 text-gray-300 mb-4" />
            <p className="text-gray-500">No data to analyze yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}