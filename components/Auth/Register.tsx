'use client'

import { registerUserWithImage } from '@/functions/AUTH/RegisterUser'
import { InputValues } from '@/functions/AUTH/SignUpInterface'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const SignUp = () => {
  const Router = useRouter()
  const [inputVal, setInputVal] = useState<InputValues>({
    Name: '',
    email: '',
    password: '',
    Salary: '', // Assuming you want to capture this
    JobDescription: '', // Added JobDescription field
    Image: null,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    try {
      const Data = await registerUserWithImage(inputVal, inputVal.Image as File)
      console.log('Api Has Responded', Data)
      // You can redirect or show a success message here
    } catch (error) {
      console.error('Registration error:', error)
      // Handle error (e.g., show a notification)
    }
  }

  return (
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
        type="number"
        placeholder="Enter Salary"
        name="Salary"
        value={inputVal.Salary}
        onChange={handleChange}
        className="mb-4 p-3 w-full rounded bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF9A8B]"
      />
      <textarea
        placeholder="Enter Job Description"
        name="JobDescription"
        value={inputVal.JobDescription}
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
        <span
          onClick={() => Router.push('/signin')}
          className="underline cursor-pointer text-[#FF9A8B] hover:text-[#FF7A6B]"
        >
          Sign In
        </span>
      </h6>
    </div>
  )
}

export default SignUp
