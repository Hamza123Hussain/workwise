'use client'
import { RootState } from '@/utils/Redux/Store/Store'
import React from 'react'
import { useSelector } from 'react-redux'
import SignIn from './Auth/SignIn'

const CondtionalLayout = ({ children }: { children: React.ReactNode }) => {
  const User = useSelector((state: RootState) => state.user)
  console.log('user details', User)
  return User.Email ? <div>{children}</div> : <SignIn />
}

export default CondtionalLayout
