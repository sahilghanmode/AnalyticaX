import React, { useEffect, useState } from 'react'
import { useAuth } from './auth-context'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth()
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    // Add a short delay to allow auth context to load from cookie/session
    const timer = setTimeout(() => {
      setCheckingAuth(false)
    }, 300) // adjust delay if needed

    return () => clearTimeout(timer)
  }, [])

  if (checkingAuth) {
    // Show a spinner or nothing while checking
    return <div className="text-center mt-10 text-gray-500">Loading...</div>
  }

  return isAuthenticated && user ? children : <Navigate to="/" replace />
}

export default PrivateRoute
