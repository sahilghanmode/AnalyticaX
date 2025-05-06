import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Login from './Login'
import SignUp from './SignUp'

const AuthButton = () => {
    const [loginOpen,setLoginOpen]=useState(false)
    const [signupOpen,setSignupOpen]=useState(false)

  return (
    <div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" className='cursor-pointer' onClick={() => setLoginOpen(true)}>
          Log in
        </Button>
        <Button className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer" onClick={() => setSignupOpen(true)}>
          Sign up
        </Button>
      </div>

      {loginOpen && <Login onOpenChange={()=>setLoginOpen(false)} />}
      {signupOpen && <SignUp onOpenChange={()=>setSignupOpen(false)} />}
    </div>
  )
}

export default AuthButton
