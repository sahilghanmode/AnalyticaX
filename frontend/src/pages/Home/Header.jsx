import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart2,Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AuthButton from '../auth/AuthButton'

const Header = () => {
  const navigate=useNavigate()
  return (
    <div>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 pl-8 cursor-pointer">
            
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                <BarChart2 className="h-4 w-4 text-white" />
              </div>
              <div onClick={()=>navigate("/")}>
                <span className="text-xl font-bold">AnalyticaX</span>
              </div>
           
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>

          <AuthButton className=''/>
        </div>
      </header>
    </div>
  )
}

export default Header
