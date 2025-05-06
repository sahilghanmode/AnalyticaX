import { useState } from 'react'
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'
import Home from './pages/Home/home'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import Verification from './pages/auth/Verification'

function App() {
  

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/verify' element={<Verification/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
