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

const ConditionalLayout = ({ children }: { children: React.ReactNode }) => {
  const User = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const encryptedData = localStorage.getItem('UserData')
    if (encryptedData) {
      try {
        const decryptedData = decryptData(encryptedData)
        dispatch(GetUserData(decryptedData))
      } catch (error) {
        console.error('Error decrypting user data:', error)
      }
    }
  }, [dispatch])

  const [isClient, setIsClient] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const authPages = ['/login', '/signup', '/reset']
  const isAuthPage = authPages.includes(pathname)

  if (!isClient) {
    return <div>Loading...</div> // Show a loading spinner or something
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
