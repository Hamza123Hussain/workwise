import { Allusers } from '@/functions/AUTH/Allusers'
import { GetUserName } from '@/utils/Redux/Slice/SelectUser/SelectSlice'
import { RootState } from '@/utils/Redux/Store/Store'
import { UserFetched } from '@/utils/SignUpInterface'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/utils/Redux/Store/Store'
import Loader3 from '../Loader3'
const UserSelection = ({ type }: { type: String }) => {
  const [Users, SetUserFetched] = useState<UserFetched[]>([])
  const [loading, setloading] = useState(true)
  const User = useSelector((state: RootState) => state.user)
  const Dispatch = useDispatch<AppDispatch>()
  const SelectedUser = useSelector((state: RootState) => state.Select)
  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    Dispatch(GetUserName(event.target.value)) // Update selected user when dropdown changes
  }
  const Getusers = async () => {
    const Data = await Allusers(User.Email)
    if (Data) {
      SetUserFetched(Data)
      setloading(false)
    }
  }
  useEffect(() => {
    Getusers()
  }, [])
  return (
    <>
      {User.Email === 'octtoppus1@gmail.com' && Users.length > 0 && !loading ? ( // Check if there are users
        <div className="my-4">
          <h2 className="text-2xl font-semibold mb-4 text-white text-center">
            All {type} Records For {SelectedUser}
          </h2>
          <h2 className="text-2xl font-semibold mb-4 text-white text-center"></h2>
          <label
            htmlFor="user-select"
            className="mr-3 font-medium text-purple-400"
          >
            Select User
          </label>
          <select
            id="user-select"
            value={SelectedUser}
            onChange={handleUserChange}
            className="p-2 bg-black border border-purple-500 text-purple-400 rounded-md"
          >
            {Users.map((user) => (
              <option key={user.createdAt} value={user.Name}>
                {user.Name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <Loader3 />
      )}
    </>
  )
}
export default UserSelection
