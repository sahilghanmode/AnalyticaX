import { StrictMode } from 'react'
import { Toaster } from './components/ui/sonner'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './lib/auth-context'
import './index.css'
import App from './App.jsx'
import { ExcelDataProvider } from './lib/excel-context'
import { AdminDataProvider } from './lib/admin-context'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ExcelDataProvider>
      <AdminDataProvider>
        <App />
        <Toaster closeButton></Toaster>
      </AdminDataProvider>
      </ExcelDataProvider>
      
    </AuthProvider>
    
  </StrictMode>,
)
