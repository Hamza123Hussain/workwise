import React, { useState } from 'react'
import { handleResetPassword } from '../../functions/Auth/ResetPass'

const ResetPassword = () => {
  const [email, setEmail] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    const data = await handleResetPassword(email)
    if (data) {
      console.log('api resposnde', data)
    }
  }

  return (
    <div className=" p-6 rounded-lg shadow-lg h-fit my-10 max-w-md mx-auto w-full">
      <h2 className="text-3xl font-semibold text-[#FF9A8B] mb-6 text-center">
        Reset Password
      </h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9A8B]"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#FF9A8B] text-white p-3 rounded-lg hover:bg-[#ff8777] transition duration-200"
        >
          Reset Password
        </button>
      </form>
    </div>
  )
}

export default ResetPassword
