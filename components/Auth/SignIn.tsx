'use client'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { handleLoginClick } from '@/functions/Frontend/HandleLogin'
import Header from '../Layout/Header'

const SignIn = () => {
  const dispatch = useDispatch()
  const [inputVal, setInputVal] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target
    setInputVal((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault() // Prevent the default form submission
    handleLoginClick(inputVal.email, inputVal.password, dispatch)
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="md:w-1/2 p-4 bg-[#a582ff] text-white flex flex-col items-center justify-center">
        <Header />
      </div>
      <div className="md:w-1/2 p-4 bg-white flex flex-col justify-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-4 text-purple-500 text-center">
          Sign In
        </h3>

        {/* Email Input */}
        <div className="flex flex-col items-center mb-4 w-full">
          <div className="coolinput w-full">
            <label className="text">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your Email"
              name="email"
              value={inputVal.email}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="flex flex-col items-center mb-4 w-full">
          <div className="coolinput w-full">
            <label className="text">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={inputVal.password}
              onChange={handleChange}
              className="input"
            />{' '}
            <div className="flex justify-end text-left text-xs my-2  mt-1">
              <a href="reset" className="text-purple-500 hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>

          {/* Forgot Password Link */}
        </div>

        {/* Submit Button */}
        <div className=" my-5 mx-auto">
          <button
            type="submit"
            className="bg-purple-500 text-white px-4 py-2 rounded transition-all hover:bg-purple-600 w-full sm:w-80"
            onClick={handleSubmit}
          >
            Login
          </button>

          {/* Sign Up Link */}

          {/* <p className="text-gray-400 text-xs text-left w-full mt-4">
            Don’t have an Account?{' '}
            <span
              onClick={() => Router.push('/signup')}
              className="underline cursor-pointer text-purple-500 hover:text-purple-600"
            >
              Sign Up
            </span>
          </p> */}
        </div>
      </div>
    </div>
  )
}

export default SignIn
