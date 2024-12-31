'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Layout/Header'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
import ResendButton from '@/components/Otp/ResendButton'
import { handleVerifyOtp } from '@/functions/Frontend/OTP/Verify'
const VerifyOtp = () => {
  const [otp, setOtp] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const Router = useRouter()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value)
  }
  const Dispatch = useDispatch()
  const User = useSelector((state: RootState) => state.user)
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="md:w-1/2 p-4 bg-[#a582ff] text-white flex flex-col items-center justify-center">
        <Header />
      </div>
      <div className="md:w-1/2 p-4 bg-white flex flex-col justify-center items-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-6 text-purple-500 text-center">
          Verify OTP
        </h3>
        <div className="flex flex-col items-center  max-w-sm">
          <div className="coolinput">
            <label className="text">OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={handleChange}
              className="input  border border-purple-500 rounded px-4 py-2"
            />
          </div>
          <button
            onClick={() =>
              handleVerifyOtp(setIsVerifying, User.Email, otp, Router, Dispatch)
            }
            className="bg-purple-500 text-white px-4 mt-5 py-2 rounded transition-all hover:bg-purple-600  mb-4"
            disabled={isVerifying}
          >
            {isVerifying ? 'Verifying...' : 'Verify OTP'}
          </button>
          <ResendButton />
        </div>
      </div>
    </div>
  )
}
export default VerifyOtp
