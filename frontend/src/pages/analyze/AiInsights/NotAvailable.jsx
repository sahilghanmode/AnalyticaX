import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Lock } from 'lucide-react'
import { Sparkles } from 'lucide-react'

const NotAvailable = () => {
  return (
    <Card className="h-full">
      <CardContent className="pt-6 flex flex-col items-center justify-center h-full text-center">
        <div className="bg-amber-50 p-3 rounded-full mb-4">
          <Lock className="h-8 w-8 text-amber-500" />
        </div>
        <h3 className="text-lg font-medium mb-2">AI-Powered Insights</h3>
        <p className="text-gray-500 mb-6 px-4">
          Log in or create an account to unlock AI-generated insights about your data.
        </p>
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="h-4 w-4 text-amber-500 mr-2" />
          <span className="text-sm text-amber-700">Discover patterns and get recommendations</span>
        </div>
        
      </CardContent>
    </Card>
  )
}

export default NotAvailable
