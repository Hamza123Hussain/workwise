'use client'
import { useState } from 'react'
import { handlePasswordReset } from '../../functions/AUTH/ResetPass'
import { useNavigate } from 'react-router-dom'
const ResetPassword = () => {
  const Router = useNavigate()
  const [email, setemail] = useState('')
  const HandlePasswordReset = async () => {
    const Data = await handlePasswordReset(email)
    if (Data) {
      console.log('USER DATA ', Data)
      Router('/Login')
    } else {
      console.error('Login failed')
    }
  }
  return (
    <div className="flex flex-col bg-[#003366] p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-semibold text-[#FF9A8B] mb-6 text-center">
        Reset Password
      </h2>
      <input
        type="email"
        placeholder="Enter Email"
        name="email"
        value={email}
        onChange={(e: any) => setemail(e.target.value)}
        className="mb-4 p-3 w-full rounded bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF9A8B]"
      />
      <button
        onClick={HandlePasswordReset}
        className="bg-[#FF9A8B] hover:bg-[#FF7A6B] text-white font-semibold px-6 py-2 rounded transition-all w-full"
      >
        Reset Password
      </button>
    </div>
  )
}
export default ResetPassword
