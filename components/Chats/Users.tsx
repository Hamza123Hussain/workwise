import { Allusers } from '@/functions/AUTH/Allusers'
import { RootState } from '@/utils/Redux/Store/Store'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { GettingOnlyUserDetails, Userss } from '@/functions/Kpi/OnlyUserDetails'
import Loader2 from '../Loader2'
import SingleUser from './SingleUser'
const Users = () => {
  const [AllUsers, SetAllUsers] = useState<Userss[]>([])
  const User = useSelector((state: RootState) => state.user)
  const [loading, setloading] = useState(false)
  useEffect(() => {
    const GetAllUsers = async () => {
      setloading(true)
      const GettingUsers = await GettingOnlyUserDetails(User._id)
      if (GettingUsers) {
        SetAllUsers(GettingUsers)
      }
    }
    GetAllUsers()
    setloading(false)
  }, [User.Email])

  return (
    <div className="flex flex-col gap-3 h-[70vh] overflow-y-auto">
      {loading ? (
        <div className=" flex justify-center min-h-screen items-center">
          <Loader2 />
        </div>
      ) : (
        Allusers.length > 0 &&
        AllUsers.map((element) => (
          <SingleUser
            UserName={element.UserName}
            key={element._id}
            UserEmail={element.UserEmail}
            UserID={element._id}
          />
        ))
      )}
    </div>
  )
}
export default Users
