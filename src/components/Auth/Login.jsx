import React, { useState } from 'react'
import { handleLogin } from '../../functions/Auth/Login'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    const data = await handleLogin(email)
    if (data) {
      console.log('api resposnde', data)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-auto">
      <h2 className="text-3xl font-semibold text-[#FF9A8B] mb-6 text-center">
        Login
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
        <div>
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9A8B]"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#FF9A8B] text-white p-3 rounded-lg hover:bg-[#ff8777] transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
