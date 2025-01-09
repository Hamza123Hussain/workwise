import { Allusers } from '@/functions/AUTH/Allusers'
import { RootState } from '@/utils/Redux/Store/Store'
import { UserFetched } from '@/utils/Interfaces/SignUpInterface'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChatLoader from './ChatLoader'
import { SetRecipentID } from '@/utils/Redux/Slice/chatslice/chatslice'
const Users = () => {
  const Dispatch = useDispatch()
  const [AllUsers, SetAllUsers] = useState<UserFetched[]>([])
  const User = useSelector((state: RootState) => state.user)
  const [loading, setloading] = useState(false)
  useEffect(() => {
    const GetAllUsers = async () => {
      setloading(true)
      const Users = await Allusers(User.Email)
      if (Users) {
        SetAllUsers(Users)
      }
    }
    GetAllUsers()
    setloading(false)
  }, [User.Email])
  const SetRecipentData = (Name: string, Email: string) => {
    Dispatch(
      SetRecipentID({
        Name,
        Email,
      })
    )
  }
  return (
    <div className="flex flex-col gap-3 h-[70vh] overflow-y-auto">
      {loading ? (
        <div className=" flex justify-center min-h-screen items-center">
          <ChatLoader />
        </div>
      ) : (
        Allusers.length > 0 &&
        AllUsers.map((element) => (
          <div
            onClick={() => SetRecipentData(element.Name, element.Email)}
            key={element.Email}
            className="flex items-center cursor-pointer gap-3 p-2 hover:bg-gray-700 rounded-lg transition-colors"
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
        ))
      )}
    </div>
  )
}

export default Users
