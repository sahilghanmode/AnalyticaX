import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Login from './Login'
import SignUp from './SignUp'
import { useAuth } from '@/lib/auth-context'
import Verification from './Verification'
import { UserNav } from './UserNav'

const AuthButton = () => {
    const [loginOpen,setLoginOpen]=useState(false)
    const [signupOpen,setSignupOpen]=useState(false)
    const [verificationOpen,setVerificationOpen]=useState(false)
    const [emailforVerification, setEmailforVerification]=useState("")
    const { user, isAuthenticated } = useAuth()

    if (isAuthenticated && user ) {
      return <UserNav user={user} />
    }

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

      {loginOpen && <Login onOpenChange={()=>setLoginOpen(false)} setSignupOpen={setSignupOpen}/>}
      {signupOpen && <SignUp onOpenChange={()=>setSignupOpen(false)} setLoginOpen={setLoginOpen} setVerificationOpen={setVerificationOpen} setEmailforVerification={setEmailforVerification} />}
      {verificationOpen && <Verification emailforVerification={emailforVerification}/>}
      
    </div>
  )
}

export default AuthButton
