'use client'
import React, { useState } from 'react'
import { RegisterUser } from '../functions/AUTH/RegisterUser'
import { InputValues } from '../functions/AUTH/SignUpInterface'
const SignUp = () => {
  const [inputVal, setInputVal] = useState<InputValues>({
    Name: '',
    email: '',
    password: '',
    Image: null as File | null,
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInputVal((prev) => ({ ...prev, [name]: value }))
  }
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null // Get the first file or null
    setInputVal((prev: InputValues) => ({
      ...prev,
      Image: file,
    }))
  }
  const handleSignUp = async () => {
    const Data = await RegisterUser(inputVal)
    console.log('Api Has Responded', Data)
  }
  return (
    <div className="flex items-center justify-center h-screen bg-[#333333]">
      <div className="flex flex-col bg-[#003366] p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-[#FF9A8B] mb-6 text-center">
          Sign Up
        </h2>
        <input
          type="text"
          placeholder="Enter Name"
          name="Name"
          value={inputVal.Name}
          onChange={handleChange}
          className="mb-4 p-3 w-full rounded bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF9A8B]"
        />
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          value={inputVal.email}
          onChange={handleChange}
          className="mb-4 p-3 w-full rounded bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF9A8B]"
        />
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          value={inputVal.password}
          onChange={handleChange}
          className="mb-4 p-3 w-full rounded bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF9A8B]"
        />
        <input
          type="file"
          onChange={handleImageChange}
          className="mb-4 p-3 w-full rounded bg-slate-700 text-white placeholder-gray-400 focus:outline-none"
        />
        <button
          onClick={handleSignUp}
          className="bg-[#FF9A8B] hover:bg-[#FF7A6B] text-white font-semibold px-6 py-2 rounded transition-all w-full"
        >
          Sign Up
        </button>
        <h6 className="text-xs mt-4 text-gray-400 text-center">
          Already Have An Account?{' '}
          <span className="underline cursor-pointer text-[#FF9A8B] hover:text-[#FF7A6B]">
            Sign In
          </span>
        </h6>
      </div>
    </div>
  )
}

export default SignUp
