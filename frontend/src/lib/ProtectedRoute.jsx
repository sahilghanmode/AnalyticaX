import React, { useEffect, useState } from 'react'
import { useAuth } from './auth-context'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children, RequiredRole }) => {
  const { isAuthenticated, user } = useAuth()
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setCheckingAuth(false)
    }, 300) 

    return () => clearTimeout(timer)
  }, [])

  if (checkingAuth) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>
  }

  const allowedRoles = Array.isArray(RequiredRole) ? RequiredRole : [RequiredRole]

  const hasAccess = isAuthenticated && user && allowedRoles.includes(user.role)

  return hasAccess ? children : <Navigate to="/" replace />
}

export default PrivateRoute
