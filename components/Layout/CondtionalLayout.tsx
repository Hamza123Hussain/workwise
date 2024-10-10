'use client'
import { RootState } from '@/utils/Redux/Store/Store'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetUserData } from '@/utils/Redux/Slice/User/UserSlice'
import { usePathname } from 'next/navigation'
import { decryptData } from '@/utils/Encryprion'
import SignIn from '../Auth/SignIn'
import Sidebar from '../Home/SideBar/SideBar'
import HomePage from '../Home/Homepage'
import { Toaster } from 'react-hot-toast'
import Footer from './Footer'
import Header from './Header'
const ConditionalLayout = ({ children }: { children: React.ReactNode }) => {
  const User = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    const encryptedData = localStorage.getItem('UserData')
    if (encryptedData) {
      const decryptedData = decryptData(encryptedData) // Decrypt the data
      dispatch(GetUserData(decryptedData))
    }
  }, [dispatch])
  const [isClient, setIsClient] = useState(false)
  const pathname = usePathname()
  // Use useEffect to only set isClient on the client-side
  useEffect(() => {
    setIsClient(true)
  }, [])
  // Check if the current route is login or signup
  const isAuthPage =
    pathname === '/login' || pathname === '/signup' || pathname === '/reset'
  // Render the layout based on client-side state
  if (!isClient) {
    return null // or a loading spinner if preferred
  }
  return User.Email ? (
    <div className=" flex bg-purple-black min-h-screen w-[100vw]">
      <Sidebar />
      <div className=" flex-1 ">{!isAuthPage ? children : <HomePage />}</div>
      <Toaster />
    </div>
  ) : (
    <div className=" min-h-screen flex flex-col  bg-purple-black p-6 ">
      {' '}
      <Header />
      <div className=" flex-1 flex justify-center items-center">
        {isAuthPage ? children : <SignIn />}
      </div>
      <Footer />
    </div>
  )
}
export default ConditionalLayout
