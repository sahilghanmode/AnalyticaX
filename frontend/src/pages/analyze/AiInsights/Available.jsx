import React, { useState } from 'react'
import { ShieldAlert, Lock, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const Available = () => {
    const [aiInsightsEnabled, setAIInsightsEnabled] = useState(false)
    const [isLoading,setIsLoading]=useState(false)

    return (
        !aiInsightsEnabled ? (
            <Card className="h-full">
                <CardContent className="pt-6 flex flex-col items-center justify-center h-full text-center">
                    <div className="bg-blue-50 p-3 rounded-full mb-4">
                        <ShieldAlert className="h-8 w-8 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">AI-Powered Insights</h3>
                    <p className="text-gray-500 mb-6 px-4">
                        Get AI-generated insights about your data. This requires processing your data with our AI
                        systems.
                    </p>
                    <div className="flex items-center justify-center mb-4">
                        <Lock className="h-4 w-4 text-amber-500 mr-2" />
                        <span className="text-sm text-amber-700">Your data privacy is important to us</span>
                    </div>
                    <Button
                        // onClick={handleEnableAIInsights}
                        className="bg-blue-500 hover:bg-blue-600 flex items-center cursor-pointer"
                    >
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate AI Insights
                    </Button>
                </CardContent>
            </Card>
        ) : (
            <DataSummary isLoading={isGeneratingSummary} summary={dataSummary} fileName={file?.name || ""} />
        )
    )
}

export default Available
