import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/lib/auth-context'

const Verification = ({emailforVerification}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const navigate=useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("")
  const [validityTimer, setValidityTimer] = useState(15 * 60)
  const [canResend, setCanResend] = useState(true)
  const [resendTimer, setResendTimer] = useState(0)
  const {verify}=useAuth()
  const inputRefs = Array(6)
  .fill(0)
  .map(() => React.createRef());

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    if (validityTimer <= 0) {
      setError("OTP has expired. Please request a new one.")
      setCanResend(true)
      setResendTimer(0)
      return
    }

    const interval = setInterval(() => {
      setValidityTimer((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [validityTimer])

  useEffect(() => {
    if (resendTimer <= 0) {
      setCanResend(true)
      return
    }

    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [resendTimer])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      toast.error('Please enter all 6 digits of the OTP');
      return;
    }
    
    setIsLoading(true);
    try {
      await verify(emailforVerification, otpValue);
      
      
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error('OTP verification error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
    
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigator.clipboard.readText().then((text) => {
        const digits = text.replace(/\D/g, '').split('').slice(0, 6);
        const newOtp = [...otp];
        
        digits.forEach((digit, idx) => {
          if (idx + index < 6) {
            newOtp[idx + index] = digit;
          }
        });
        
        setOtp(newOtp);
        
        // Focus the next empty input or the last input
        const nextEmptyIndex = newOtp.findIndex((val) => val === '');
        if (nextEmptyIndex !== -1) {
          inputRefs[nextEmptyIndex].current.focus();
        } else if (digits.length + index < 6) {
          inputRefs[digits.length + index].current.focus();
        } else {
          inputRefs[5].current.focus();
        }
      });
    }
  };
  

  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^[0-9]*$/.test(value)) return;

    const newOtp = [...otp];
    // Update the current input
    newOtp[index] = value.slice(-1); // Only keep the last character if multiple are pasted
    setOtp(newOtp);

    // Auto-focus next input if a digit was entered
    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleResend = async () => {
    if (!canResend) return

    setIsLoading(true)
    setCanResend(false)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Resending OTP to:", emailforVerification)

    setValidityTimer(15 * 60)
    setResendTimer(30)

    setIsLoading(false)
    setError("")
  }

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
                    maxLength={1}
                    className="w-12 h-12 text-center text-lg"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    autoFocus={index === 0}
                    disabled={isLoading}
                  />
                ))}
              </div>
              
              <div className="text-center text-sm">
                <div className="flex items-center justify-center gap-1 text-amber-600">
                  <span>Code expires in:</span>
                  <span className="font-medium">{formatTime(validityTimer)}</span>
                </div>
              </div>
              {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            </div>
              <Button 
                type="submit"
                onClick={handleSubmit}
                className='w-[350px] bg-emerald-500 hover:bg-emerald-600 cursor:pointer ml-6 mt-3 pr-5 '
                disabled={isLoading}
              >
                {isLoading? 'Verifying...' :'verify'}
              </Button>
              <div className="text-center text-sm">
                Didn't receive a code?{" "}
                <Button variant="link" className="p-0 h-auto" onClick={handleResend} disabled={!canResend || isLoading}>
                  Resend
                </Button>
                {!canResend && resendTimer > 0 && <span className="text-gray-500 ml-1">in {formatTime(resendTimer)}</span>}
              </div>
            
          </form>

        </div>
        
      </div>
    </div>
  )
}

export default Verification
