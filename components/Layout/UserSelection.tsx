import { Allusers } from '@/functions/AUTH/Allusers'
import { GetUserName } from '@/utils/Redux/Slice/SelectUser/SelectSlice'
import { RootState } from '@/utils/Redux/Store/Store'
import { UserFetched } from '@/utils/SignUpInterface'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const UserSelection = () => {
  const [Users, SetUserFetched] = useState<UserFetched[]>([])
  const User = useSelector((state: RootState) => state.user)
  const Dispatch = useDispatch()
  const SelectedUser = useSelector((state: RootState) => state.Select)
  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    Dispatch(GetUserName(event.target.value)) // Update selected user when dropdown changes
  }
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
    <>
      {User.Email === 'octtoppus1@gmail.com' && (
        <div className="my-4">
          {/* Dropdown for selecting a user if email is octtoppus1@gmail.com */}
          <label htmlFor="user-select" className="mr-3 font-medium text-white">
            Select User:
          </label>
          <select
            id="user-select"
            value={SelectedUser}
            onChange={handleUserChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            {Users.map((user) => (
              <option key={user.createdAt} value={user.Name}>
                {user.Name}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  )
}
export default UserSelection
