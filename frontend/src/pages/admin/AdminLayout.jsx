import PrivateRoute from '@/lib/ProtectedRoute'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <PrivateRoute RequiredRole={['admin']}>
        <Outlet/>
    </PrivateRoute>
  )
}

export default AdminLayout
