import React, { Children } from 'react'
import { useAuth } from './auth-context'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const {isAuthenticated , user}=useAuth()
    return isAuthenticated && user ?(
        children
    ):(
        <Navigate to="/" replace={true} />
    )
}

export default PrivateRoute
