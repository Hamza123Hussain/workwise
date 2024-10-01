'use client'
import UserCard from '@/components/Profile/UserCard'
import { Allusers } from '@/functions/AUTH/Allusers'
import { UserFetched } from '@/functions/AUTH/SignUpInterface'
import { RootState } from '@/utils/Redux/Store/Store'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
const AllUserData = () => {
  const [UserFetched, SetUserFetched] = useState<UserFetched[]>([])
  const User = useSelector((state: RootState) => state.user)
  const Getusers = async () => {
    const Data = await Allusers(User.Email)
    if (Data) {
      SetUserFetched(Data)
    }
  }
  useEffect(() => {
    Getusers()
  }, [])
  return (
    <div className=" grid sm:grid-cols-2 grid-cols-1 gap-5 my-10  ">
      {UserFetched.map((element) => (
        <UserCard User={element} key={element.Email} />
      ))}
    </div>
  )
}

export default AllUserData
