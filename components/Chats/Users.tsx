import { Allusers } from '@/functions/AUTH/Allusers'
import { RootState } from '@/utils/Redux/Store/Store'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GettingOnlyUserDetails, Userss } from '@/functions/Kpi/OnlyUserDetails'
import Loader2 from '../Loader2'
import { SetRecipentDetails } from '@/utils/Redux/Slice/chatslice/chatslice'
const Users = () => {
  const Dispatch = useDispatch()
  const [AllUsers, SetAllUsers] = useState<Userss[]>([])
  const User = useSelector((state: RootState) => state.user)
  const [loading, setloading] = useState(false)
  const [UserActive, SetUserActive] = useState('')
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
  const SetRecipentData = (Name: string, Email: string, UserID: string) => {
    Dispatch(
      SetRecipentDetails({
        Name,
        Email,
        UserID,
      })
    )
    SetUserActive(Name)
  }
  return (
    <div className="flex flex-col gap-3 h-[70vh] overflow-y-auto">
      {loading ? (
        <div className=" flex justify-center min-h-screen items-center">
          <Loader2 />
        </div>
      ) : (
        Allusers.length > 0 &&
        AllUsers.map((element) => (
          <div
            onClick={() =>
              SetRecipentData(
                element.UserName,
                element.UserEmail,
                element.UserId
              )
            }
            key={element.UserEmail}
            className={`flex items-center ${
              element.UserName === UserActive ? 'bg-gray-700' : ''
            } cursor-pointer gap-3 p-2 hover:bg-gray-700 rounded-lg transition-colors`}
          >
            <h6 className="text-white font-medium">{element.UserName}</h6>
          </div>
        ))
      )}
    </div>
  )
}
export default Users
