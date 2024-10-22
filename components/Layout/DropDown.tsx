import { GetUserName } from '@/utils/Redux/Slice/SelectUser/SelectSlice'
import { AppDispatch, RootState } from '@/utils/Redux/Store/Store'
import { UserFetched } from '@/utils/SignUpInterface'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
const DropDown = ({ type, Users }: { type: string; Users: UserFetched[] }) => {
  const SelectedUser = useSelector((state: RootState) => state.Select)
  const Dispatch = useDispatch<AppDispatch>()
  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    Dispatch(GetUserName(event.target.value)) // Update selected user when dropdown changes
  }
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4 text-black text-center">
        All {type} Records For {SelectedUser}
      </h2>
      <label htmlFor="User-select" className="mr-3 font-medium text-purple-400">
        Select User
      </label>
      <select
        id="User-select"
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
    </>
  )
}
export default DropDown
