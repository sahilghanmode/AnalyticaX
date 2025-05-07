import React from 'react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Eye,EyeOff } from 'lucide-react'
import Verification from './Verification'

const SignUp = ({onOpenChange, setLoginOpen}) => {
  const [showpassword,setShowPassword]=useState(true)
  const [otpVerification,setOtpVerification]=useState(false)

  function handleSubmit(e){
    e.preventDefault()
    onOpenChange()
    setOtpVerification(true)
  }

  function handleLoginClick(){
    onOpenChange()
    setLoginOpen(true)
  }
  return (
    <div className='fixed cursor-pointer w-full left-0 top-0 h-[100dvh] bg-black/50 flex justify-center items-center' >
      <div className='bg-white h-140 w-[420px] flex flex-col border rounded-lg'>
        <div className='pr-4 pt-4 pl-4 pb-2  flex justify-between'>
          <div className='font-bold text-2xl'>
            Create your account
          </div>
            
          <div onClick={()=>onOpenChange()}>
            X
          </div>
        </div>

        <div className='text-sm text-gray-500 pl-4 pd-6'>
          Join AnalyticaX to transform your data into powerful visualizations
        </div>

        <form onSubmit={handleSubmit} className='space-y-3 pt-6'>
          <div className='space-y-2 pr-2 pl-4 pd-9'>

            <div className='font-medium'>
              Enter your name
            </div>
            <Input placeholder='name'></Input>

            <div className=' font-medium pt-0 pd-0'>Enter your Email</div>
            <Input placeholder='name@example.com' />

            <div className='font-medium space-y-2 '>
              <div>
                Enter your password
              </div>

              <div className='relative'>
                <Input placeholder='' type={showpassword? "text":"password"}/>
                <Button 
                  type="button"
                  className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent cursor-pointer' 
                  variant="ghost"
                  onClick={()=>setShowPassword(!showpassword)}
                  size="icon"
                >
                  {showpassword ? <EyeOff className='h-4 w-4'/>:<Eye className='h-4 w-4'/>}
                </Button>
              </div>
              
            </div>

            <div className='font-medium'>
              Confirm your password
            </div>
            <Input placeholder='' type='password'></Input>

            <Button className='w-full mt-5 cursor-pointer bg-emerald-500 hover:bg-emerald-600' type="submit">Sign Up</Button>
          </div>


        </form>

        <div className='flex p-4'>
          <div >
            Already have an account?
          </div>

          <div className='pl-1 hover:underline' onClick={handleLoginClick} >
            Log in
          </div>
        </div>
      </div>

      {otpVerification && <Verification onOpenChange={()=>setOtpVerification(false)}/>}
    </div>
  )
}

export default SignUp
