'use client'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { loginUser } from '@/functions/AUTH/LoginUser'
import { ClearUser, GetUserData } from '@/utils/Redux/Slice/User/UserSlice'
import { encryptData } from '@/utils/Encryprion'
import { handleSignOut } from '@/functions/AUTH/SignOut'
const SignIn = () => {
  const dispatch = useDispatch()
  const [inputVal, setInputVal] = useState({
    email: '',
    password: '',
  })
  const Router = useRouter()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleLoginClick = async () => {
    const data = await loginUser(inputVal.email, inputVal.password)
    if (data) {
      const encryptedData = encryptData(data)
      localStorage.setItem('UserData', encryptedData)
      dispatch(GetUserData(data))
      Router.push('/')
      scheduleSignout()
    } else {
      console.error('Login failed')
    }
  }
  const scheduleSignout = () => {
    // Define the sign-out timeout as 7 hours (7 hours * 60 minutes * 60 seconds * 1000 milliseconds)
    const signoutTimeout = 7 * 60 * 60 * 1000 // 7 hours in milliseconds

    // Set a timeout to trigger after 7 hours
    setTimeout(async () => {
      // Call the async function 'handleSignOut' to sign the user out
      const SignoutDone = await handleSignOut()

      // If signout was successful (SignoutDone is true)
      if (SignoutDone) {
        // Dispatch an action to clear the user from the state (e.g., Redux or Context)
        dispatch(ClearUser())

        // Remove the user's data from localStorage, so it no longer persists on page reload
        localStorage.removeItem('UserData')
      }
    }, signoutTimeout) // The timeout triggers after the 7-hour period
  }

  return (
    <div className="flex flex-col bg-black p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-semibold text-purple-500 mb-6 text-center">
        Sign In
      </h2>
      <input
        type="email"
        placeholder="Enter Email"
        name="email"
        value={inputVal.email}
        onChange={handleChange}
        className="mb-4 p-3 w-full rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <input
        type="password"
        placeholder="Enter Password"
        name="password"
        value={inputVal.password}
        onChange={handleChange}
        className="mb-4 p-3 w-full rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button
        onClick={handleLoginClick}
        className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-2 rounded transition-all w-full"
      >
        Sign In
      </button>
      <div className="flex justify-end text-purple-500 mt-2 hover:text-purple-600 cursor-pointer">
        <span onClick={() => Router.push('/reset')} className="text-xs">
          Forgot Your Password?
        </span>
      </div>
      <h6 className="text-xs mt-4 text-gray-400 text-center">
        Don’t Have An Account?{' '}
        <span
          onClick={() => Router.push('/signup')}
          className="underline cursor-pointer text-purple-500 hover:text-purple-600"
        >
          Sign Up
        </span>
      </h6>
    </div>
  )
}
export default SignIn
