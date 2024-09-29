'use client'
import { RootState } from '@/utils/Redux/Store/Store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SignIn from './Auth/SignIn'
import { GetUserData } from '@/utils/Redux/Slice/User/UserSlice'

const CondtionalLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    const userData = localStorage.getItem('UserData')
    if (userData) {
      dispatch(GetUserData(JSON.parse(userData)))
    }
  }, [])
  const User = useSelector((state: RootState) => state.user)
  console.log('user details', User)
  return User.Email ? <div>{children}</div> : <SignIn />
}

export default CondtionalLayout
