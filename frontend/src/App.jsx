import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home/home'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import Verification from './pages/auth/Verification'
import Analyze from './pages/analyze/Analyze'
import Profile from './pages/profile/Profile'
import PrivateRoute from './lib/ProtectedRoute'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/Dashboard/AdminDashboard'
import AdminUsersPanel from './pages/admin/UsersPanel/AdminUsersPanel'
import Project from './pages/project/Project'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/verify' element={<Verification />}></Route>
          <Route path='/analyze' element={<Analyze />}> </Route>

          <Route path='/profile' element={<PrivateRoute RequiredRole={['user', 'admin']} ><Profile /></PrivateRoute>}></Route>
          <Route
            path='/project'
            element={
              <PrivateRoute RequiredRole={['user', 'admin']}>
                <Project />
              </PrivateRoute>
            }
          ></Route>

          <Route path='/admin' element={<AdminLayout/>}>
            <Route path='dashboard' element={<AdminDashboard/>} ></Route>
            <Route path='user/:userId' element={<AdminUsersPanel/>}></Route>
          </Route>


          <Route path='*' element={<Navigate to='/' replace/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
