import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { loginApi } from '@/api/user.api'
import { useAuth } from '@/lib/auth-context'

const Login = ({onOpenChange, setSignupOpen}) => {
  const [loginInputs,setLoginInputs]=useState({
    email:"",
    password:""
  })
  const {login}=useAuth()

  function handleSignUpClick(){
    onOpenChange()
    setSignupOpen(true)
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    if(!loginInputs.email){
      console.log("email is required")
      return
    }
    if(!loginInputs.password){
      console.log("password is required")
      return
    }

    try {
      await login(loginInputs.email,loginInputs.password)
      onOpenChange()
    } catch (error) {
      console.log(error.message)
    }

  }

  return (
    <div className='fixed left-0 top-0 bg-black/50 flex justify-center items-center h-[100dvh] w-full '>

        <div className='h-100 w-[425px] bg-white cursor-pointer flex flex-col border rounded-lg ' >

          <div className='pr-4 pt-4 pl-4 pb-2  flex justify-between'>
            <div className='font-bold text-2xl'>
              Log in to AnalyticaX
            </div>
            
            <div onClick={()=>onOpenChange()}>
              X
            </div>
          </div>

          <div className='text-sm text-gray-500 pl-4 pd-6'>
            Enter your credentials to access your account
          </div>

          <form onSubmit={handleSubmit} className='space-y-3 pt-6'>
            <div className='space-y-2 pr-2 pl-4 pd-9'>
              <div className=' font-medium pt-0 pd-0'>Enter your Email</div>
              <Input placeholder='name@example.com' onChange={(e)=>setLoginInputs({...loginInputs,email:e.target.value})} />

              <div className='font-medium '>Enter your password</div>
              <Input placeholder='' type="password" onChange={(e)=>setLoginInputs({...loginInputs,password:e.target.value})} />

              <Button className='w-full mt-5 cursor-pointer bg-emerald-500 hover:bg-emerald-600' type="submit">Log In</Button>
            </div>


          </form>

          <div className='flex  p-4'>
            <div className='pr-1'>
              Don't have an account?
            </div>

            <div onClick={handleSignUpClick} className='hover:underline'>
              Sign Up
            </div>
          </div>

  
        </div>



    </div>
  )
}

export default Login