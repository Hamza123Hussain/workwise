'use client'
import { RootState } from '@/utils/Redux/Store/Store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetUserData } from '@/utils/Redux/Slice/User/UserSlice'
import { usePathname, useRouter } from 'next/navigation'
import { decryptData } from '@/utils/Encryprion'
import Sidebar from './SideBar'
const ConditionalLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch()
  const Pathname = usePathname()
  const Router = useRouter()
  const AuthPages = ['/signin', '/signup', '/reset']
  useEffect(() => {
    const encryptedData = localStorage.getItem('UserData')
    if (encryptedData) {
      const decryptedData = decryptData(encryptedData) // Decrypt the data
      dispatch(GetUserData(decryptedData))
    }
  }, [dispatch])
  const User = useSelector((state: RootState) => state.user)
  const isAuthenticated = !!User.Email
  useEffect(() => {
    if (isAuthenticated && AuthPages.includes(Pathname)) {
      Router.push('/') // Redirect to the home page if logged in and on an auth page
    } else if (!isAuthenticated && !AuthPages.includes(Pathname)) {
      Router.push('/signin') // Redirect to sign-in page if not logged in and trying to access a protected page
    }
  }, [isAuthenticated, Pathname, Router])

  return AuthPages.includes(Pathname) ? (
    <div className=" min-h-screen  items-center justify-center flex">
      {children}
    </div>
  ) : (
    <div className="  flex">
      <Sidebar />
      <div className=" flex-1 ">{children}</div>
    </div>
  )
}

export default ConditionalLayout
