import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const SignUp = ({onOpenChange}) => {
  function handleSubmit(){

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

            <div className='font-medium '>Enter your password</div>
            <Input placeholder='' type='password'/>

            <div className='font-medium'>
              Confirm your password
            </div>
            <Input placeholder='' type='password'></Input>

            <Button className='w-full mt-5 cursor-pointer bg-emerald-500 hover:bg-emerald-600'>Sign Up</Button>
          </div>


        </form>

        <div>
          <div className='p-4'>
            Already have an account?
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
