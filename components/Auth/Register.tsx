'use client'
import { registerUserWithImage } from '@/functions/AUTH/RegisterUser'
import { InputValues } from '@/utils/Interfaces/SignUpInterface'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Header from '../Layout/Header' // Import the Header component

const SignUp = () => {
  const Router = useRouter()
  const [inputVal, setInputVal] = useState<InputValues>({
    Name: '',
    email: '',
    password: '',
    Salary: '',
    JobDescription: '',
    Image: null,
    JobTitle: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setInputVal((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setInputVal((prev: InputValues) => ({
      ...prev,
      Image: file,
    }))
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault() // Prevent the default form submission
    try {
      const response = await registerUserWithImage(
        inputVal,
        inputVal.Image as File
      )
      if (response) {
        toast.success('Registration successful! Redirecting to Sign In...')
        Router.push('/signin')
      }
    } catch (error) {
      console.error('Registration error:', error)
      toast.error(
        'Registration failed. Please check your details and try again.'
      )
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="md:w-1/2 p-4 bg-[#a581ff] text-white flex flex-col items-center justify-center">
        <Header />
      </div>
      <div className="md:w-1/2 p-4 bg-white flex flex-col justify-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-4 text-purple-500 text-center">
          Create Account
        </h3>
        <form className="grid sm:grid-cols-2 gap-4">
          {/* Full Name Input */}
          <div className="coolinput w-full">
            <label className="text">Full Name</label>
            <input
              type="text"
              placeholder="Enter Your Full Name"
              name="Name"
              value={inputVal.Name}
              onChange={handleChange}
              className="input" // Apply your custom input class
              required
            />
          </div>
          {/* Email Input */}
          <div className="coolinput w-full">
            <label className="text">Email</label>
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={inputVal.email}
              onChange={handleChange}
              className="input" // Apply your custom input class
              required
            />
          </div>
          {/* Password Input */}
          <div className="coolinput w-full">
            <label className="text">Set Password</label>
            <input
              type="password"
              placeholder="Enter Your Password"
              name="password"
              value={inputVal.password}
              onChange={handleChange}
              className="input" // Apply your custom input class
              required
            />
          </div>
          {/* Job Title Input */}
          <div className="coolinput w-full">
            <label className="text">Job Title</label>
            <input
              type="text"
              placeholder="Enter Job Title"
              name="JobTitle"
              value={inputVal.JobTitle}
              onChange={handleChange}
              className="input" // Apply your custom input class
              required
            />
          </div>
          {/* Salary Input */}
          <div className="coolinput w-full">
            <label className="text">Salary</label>
            <input
              type="number"
              placeholder="Enter Your Salary"
              name="Salary"
              value={inputVal.Salary}
              onChange={handleChange}
              className="input" // Apply your custom input class
              required
            />
          </div>
          {/* Job Description Textarea */}
          <div className="coolinput w-full">
            <label className="text">Job Description</label>
            <textarea
              name="JobDescription"
              placeholder="Enter Your Job Description"
              value={inputVal.JobDescription}
              onChange={handleChange}
              className="input" // Apply your custom input class
              required
            ></textarea>
          </div>
          {/* Image Upload */}
          <div className="coolinput w-full">
            <label className="text">Upload Image</label>
            <input
              type="file"
              name="imageUpload"
              accept="image/*"
              placeholder="Upload An Image"
              onChange={handleImageChange}
              className="input file:bg-purple-600 file:rounded-full file:text-white file:border-none file:p-2" // Apply your custom input class
            />
          </div>
          {/* Submit Button */}
        </form>{' '}
        <div className=" my-5 mx-auto">
          <button
            onClick={handleSignUp}
            className="bg-purple-500 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-600 w-72"
          >
            Submit
          </button>
          <h6 className="text-xs mt-4 text-gray-400 text-left">
            Already Have An Account?{' '}
            <span
              onClick={() => Router.push('/signin')}
              className="underline cursor-pointer text-purple-500 hover:text-purple-600"
            >
              Sign In
            </span>
          </h6>
        </div>
        {/* Sign In Link */}
      </div>
    </div>
  )
}

export default SignUp
