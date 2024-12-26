import { Allusers } from '@/functions/AUTH/Allusers'
import { RootState } from '@/utils/Redux/Store/Store'
import { UserFetched } from '@/utils/SignUpInterface'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Users = () => {
  const [AllUsers, SetAllUsers] = useState<UserFetched[]>([])
  const User = useSelector((state: RootState) => state.user)

  useEffect(() => {
    const GetAllUsers = async () => {
      const Users = await Allusers(User.Email)
      if (Users) {
        SetAllUsers(Users)
      }
    }
    GetAllUsers()
  }, [User.Email])

  return (
    <div className="flex flex-col gap-3">
      {AllUsers.map((element) => (
        <div
          key={element.Email}
          className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Image
            src={element.imageUrl}
            alt="User Image"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h6 className="text-white font-medium">{element.Name}</h6>
        </div>
      ))}
    </div>
  )
}

export default Users
