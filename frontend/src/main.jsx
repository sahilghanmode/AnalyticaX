import { StrictMode } from 'react'
import { Toaster } from './components/ui/sonner'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster closeButton></Toaster>
  </StrictMode>,
)
