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
import Loader3 from '../Loader3'

const ConditionalLayout = ({ children }: { children: React.ReactNode }) => {
  const User = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const [isClient, setIsClient] = useState(false)
  const pathname = usePathname()
  // Debugging the state of `isClient`
  useEffect(() => {
    console.log('Checking if client-side:', isClient)
  }, [isClient])

  // Fetch and decrypt user data from localStorage
  useEffect(() => {
    const encryptedData = localStorage.getItem('UserData')
    console.log('Encrypted Data from localStorage:', encryptedData)

    if (encryptedData) {
      try {
        const decryptedData = decryptData(encryptedData)
        console.log('Decrypted Data:', decryptedData)
        dispatch(GetUserData(decryptedData))
      } catch (error) {
        console.error('Error decrypting user data:', error)
      }
    }
  }, [dispatch])

  useEffect(() => {
    setIsClient(true)
  }, [])

  const authPages = ['/login', '/signup', '/reset']
  const isAuthPage = authPages.includes(pathname)

  if (!isClient) {
    return (
      <div className=" min-h-screen justify-center items-center flex">
        <Loader3 />
      </div>
    ) // Show loading state
  }

  return User.Email ? (
    <div className="flex bg-white min-h-screen w-[100vw]">
      <Sidebar />
      <div className="flex-1">{!isAuthPage ? children : <HomePage />}</div>
    </div>
  ) : (
    <div>{isAuthPage ? children : <SignIn />}</div>
  )
}

export default ConditionalLayout
