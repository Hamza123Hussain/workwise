import { handleResendOtp } from '@/functions/Frontend/OTP/Resend'
import { RootState } from '@/utils/Redux/Store/Store'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const ResendButton = () => {
  const [isSending, setIsSending] = useState(false)
  const User = useSelector((state: RootState) => state.user)
  return (
    <button
      type="button"
      onClick={() => handleResendOtp(setIsSending, User.Email)}
      className="bg-gray-300 text-black px-4 py-2 rounded transition-all hover:bg-gray-400 "
      disabled={isSending}
    >
      {isSending ? 'Sending...' : 'Resend OTP'}
    </button>
  )
}

export default ResendButton
