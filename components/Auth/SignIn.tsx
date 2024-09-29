'use client'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { RootState } from '@/utils/Redux/Store/Store'
import { loginUser } from '@/functions/AUTH/LoginUser'
import { GetUserData } from '@/utils/Redux/Slice/User/UserSlice'
const SignIn = () => {
  const dTAAA = useSelector((state: RootState) => state.user)
  const Disptach = useDispatch()
  const [inputVal, setInputVal] = useState({
    email: '',
    password: '',
  })
  const Router = useRouter()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const HandleLogin = async () => {
    const Data = await loginUser(inputVal.email, inputVal.password)
    if (Data) {
      console.log('Usser Data', Data)
      localStorage.setItem('UserEmail', JSON.stringify(Data.Email))
      Disptach(GetUserData(Data))
      console.log('REDUX STATE', dTAAA)
    } else {
      console.error('Login failed')
    }
  }

  return (
    <div className="flex flex-col bg-[#003366] p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-semibold text-[#FF9A8B] mb-6 text-center">
        Sign In
      </h2>
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
      <button
        onClick={HandleLogin}
        className="bg-[#FF9A8B] hover:bg-[#FF7A6B] text-white font-semibold px-6 py-2 rounded transition-all w-full"
      >
        Sign In
      </button>
      <div className="flex justify-end text-[#FF9A8B] mt-2 hover:text-[#FF7A6B] cursor-pointer">
        <span onClick={() => Router.push('/ResetPassword')} className="text-xs">
          Forgot Your Password?
        </span>
      </div>
      <h6 className="text-xs mt-4 text-gray-400 text-center">
        Don’t Have An Account?{' '}
        <span
          onClick={() => Router.push('/Register')}
          className="underline cursor-pointer text-[#FF9A8B] hover:text-[#FF7A6B]"
        >
          Sign Up
        </span>
      </h6>
    </div>
  )
}
export default SignIn
