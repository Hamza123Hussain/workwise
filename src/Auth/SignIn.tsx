'use client'
import React, { useContext, useState } from 'react'
import { loginUser } from '../functions/AUTH/LoginUser'

const SignIn = () => {
  const [inputVal, setInputVal] = useState({
    email: '',
    password: '',
    Name: '',
    Image: null, // Initialize the image as null
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const HandleLogin = async () => {
    const Data = await loginUser(inputVal.email, inputVal.password)
    if (Data) {
      console.log('USER DATA ', Data)
    } else {
      console.error('Login failed')
    }
  }

  return (
    <div className="flex flex-col bg-gray-800 p-6 rounded-lg shadow-lg mx-auto max-w-md w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      <h2 className="text-2xl sm:text-3xl font-semibold text-purple-700 mb-6 text-center">
        Sign In
      </h2>
      <input
        type="email"
        placeholder="Enter Email"
        name="email"
        value={inputVal.email}
        onChange={handleChange}
        className="mb-4 p-3 w-full rounded bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
      />
      <input
        type="password"
        placeholder="Enter Password"
        name="password"
        value={inputVal.password}
        onChange={handleChange}
        className="mb-4 p-3 w-full rounded bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
      />
      <button
        onClick={HandleLogin}
        className="bg-purple-500 hover:bg-purple-400 text-white font-semibold px-6 py-2 rounded transition-all w-full"
      >
        Sign In
      </button>
      <div className="flex justify-end text-purple-700 mt-2 hover:text-purple-900 cursor-pointer">
        <span className="text-xs sm:text-sm">Forgot Your Password?</span>
      </div>
      <h6 className="text-xs mt-4 text-gray-400 text-center">
        Don’t Have An Account?{' '}
        <span className="underline cursor-pointer text-purple-700 hover:text-purple-900">
          Sign Up
        </span>
      </h6>
    </div>
  )
}

export default SignIn
