'use client'
import Loader from '@/components/Loader'
import UserCard from '@/components/Profile/UserCard'
import { Allusers } from '@/functions/AUTH/Allusers'
import { RootState } from '@/utils/Redux/Store/Store'
import { UserFetched } from '@/utils/Interfaces/SignUpInterface'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
const AllUserData = () => {
  const [Loading, SetLoading] = useState(false)
  const [UserFetched, SetUserFetched] = useState<UserFetched[]>([])
  const User = useSelector((state: RootState) => state.user)

  const Getusers = async () => {
    SetLoading(true)
    const Data = await Allusers(User.Email)
    if (Data) {
      SetUserFetched(Data)
      SetLoading(false)
    }
  }

  useEffect(() => {
    Getusers()
    return () => {
      Getusers()
    }
  }, [])

  if (Loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2  gap-6 px-4 py-10">
      {UserFetched.map((element) => (
        <UserCard User={element} key={element.Email} />
      ))}
    </div>
  )
}

export default AllUserData
