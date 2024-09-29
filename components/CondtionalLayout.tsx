'use client'
import { RootState } from '@/utils/Redux/Store/Store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SignIn from './Auth/SignIn'
import { GetUserData } from '@/utils/Redux/Slice/User/UserSlice'
import { decryptData } from '@/utils/Encryprion'

const CondtionalLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    const encryptedData = localStorage.getItem('UserData')
    if (encryptedData) {
      const decryptedData = decryptData(encryptedData) // Decrypt the data
      dispatch(GetUserData(decryptedData))
    }
  }, [])
  const User = useSelector((state: RootState) => state.user)
  console.log('user details', User)
  return User.Email ? <div>{children}</div> : <SignIn />
}

export default CondtionalLayout
