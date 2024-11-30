'use client'
import { useState } from 'react'
import { handlePasswordReset } from '../../functions/AUTH/ResetPass'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const ResetPassword = () => {
  const Router = useRouter()
  const [email, setEmail] = useState('')

  const handlePasswordResetClick = async () => {
    console.log(email) // Check if the email is captured correctly
    const data = await handlePasswordReset(email)
    if (data) {
      toast.success('Reset Password Email Sent')
      Router.push('/Login')
    } else {
      console.error('Password reset failed')
    }
  }

  return (
    <div className="flex flex-col bg-black p-6 rounded-lg shadow-lg w-full max-w-md mx-auto my-24 justify-center items-center">
      <h2 className="text-2xl font-semibold text-purple-500 mb-6 text-center">
        Reset Password
      </h2>
      <input
        type="email"
        placeholder="Enter Email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4 p-3 w-full rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button
        onClick={handlePasswordResetClick}
        className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-2 rounded transition-all w-full"
      >
        Reset Password
      </button>
    </div>
  )
}

export default ResetPassword
