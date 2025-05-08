import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Verification = ({emailforVerification}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const inputRefs = Array(6)
  .fill(0)
  .map(() => React.createRef());


  return (
    <div className='fixed  left-0 top-0 bg-black/50 flex justify-center items-center h-[100dvh] w-full'>
      <div className='bg-white h-70 w-[420px] flex flex-col border rounded-lg'>
        <div className='pt-4 pl-4 pb-2 '>
          <div className='text-2xl font-bold'>
            Verify your email
          </div>
          <div className='flex font-sm text-gray-500'>
            <div className='pr-1.5'>
              we've sent email to 
            </div>
            <div className='font-medium'>
              {emailforVerification}
            </div>
          </div>

          <form className='space-y-4 pt-4'>

            <div className='space-y-4'>

              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    className="w-12 h-12 text-center text-lg"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              <Button 
                type="submit"
                className='w-[350px] bg-emerald-500 hover:bg-emerald-600 cursor:pointer ml-6 mt-3 pr-5 '
              >
                Verify
              </Button>

            </div>
          </form>

        </div>
        
      </div>
    </div>
  )
}

export default Verification
