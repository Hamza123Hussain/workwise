import { GetUserName } from '@/utils/Redux/Slice/SelectUser/SelectSlice'
import { RootState } from '@/utils/Redux/Store/Store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/utils/Redux/Store/Store'
import Loader3 from '../Loader3'
import { UserFetched } from '@/utils/SignUpInterface'
const UserSelection = ({
  type,
  Users,
}: {
  type: string
  Users: UserFetched[]
}) => {
  const User = useSelector((state: RootState) => state.user)
  const Dispatch = useDispatch<AppDispatch>()
  const SelectedUser = useSelector((state: RootState) => state.Select)
  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    Dispatch(GetUserName(event.target.value)) // Update selected user when dropdown changes
  }
  return (
    <>
      {User.Email === 'octtoppus1@gmail.com' && Users.length > 0 ? ( // Check if there are users
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
