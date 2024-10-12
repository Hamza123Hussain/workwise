import { GetUserName } from '@/utils/Redux/Slice/SelectUser/SelectSlice'
import { RootState } from '@/utils/Redux/Store/Store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
const UserSelection = () => {
    const Dispatch=useDispatch()
    const SelectedUser=useSelector((state:RootState)=>state.Select)
    const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      Dispatch(GetUserName(event.target.value)) // Update selected user when dropdown changes
    }
  
  return (

    {User.Email === 'octtoppus1@gmail.com' && (
        <div className="my-4">
          {/* Dropdown for selecting a user if email is octtoppus1@gmail.com */}
          <label htmlFor="user-select" className="mr-3 font-medium">
            Select User:
          </label>
          <select
            id="user-select"
            value={selectedUser}
            onChange={handleUserChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            {dummyUsers.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
      )}
  )
}

export default UserSelection
