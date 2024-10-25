import { GetUserName } from '@/utils/Redux/Slice/SelectUser/SelectSlice'
import { AppDispatch, RootState } from '@/utils/Redux/Store/Store'
import { UserFetched } from '@/utils/SignUpInterface'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Dropdowns from '../Tasks/Dropdowns'
const DropDown = ({ type, Users }: { type: string; Users: UserFetched[] }) => {
  const SelectedUser = useSelector((state: RootState) => state.Select)
  const Dispatch = useDispatch<AppDispatch>()
  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    Dispatch(GetUserName(event.target.value)) // Update selected user when dropdown changes
  }
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-black text-center">
        All {type} Records For {SelectedUser}
      </h2>
      <div className=" flex items-center justify-between">
        <div className=" flex flex-col">
          <label
            htmlFor="User-select"
            className="mr-3 font-medium text-[#ac58ff]"
          >
            Select User
          </label>
          <select
            id="User-select"
            value={SelectedUser}
            onChange={handleUserChange}
            className="border-2 border-white text-white p-2 rounded-lg 
           focus:outline-none focus:ring focus:ring-white bg-[#a56edd] transition ease-in-out"
          >
            {Users.map((user) => (
              <option key={user.createdAt} value={user.Name}>
                {user.Name}
              </option>
            ))}
          </select>
        </div>
        <Dropdowns />
      </div>
    </div>
  )
}
export default DropDown
