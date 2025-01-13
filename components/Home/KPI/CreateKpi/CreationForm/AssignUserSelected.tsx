import { Allusers } from '@/functions/AUTH/Allusers'
import { UserFetched } from '@/utils/Interfaces/SignUpInterface'
import { setUser } from '@/utils/Redux/Slice/User_Selected_Slice/Slice'
import { RootState } from '@/utils/Redux/Store/Store'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AssignedUserSelect = () => {
  const [allUsers, setAllUsers] = useState<UserFetched[]>([]) // State to hold fetched users
  const dispatch = useDispatch()
  const userSelect = useSelector((state: RootState) => state.UserSelect) // Selected user from Redux

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await Allusers('octtoppus1@gmail.com') // Replace with dynamic email if needed
        if (data) {
          setAllUsers(data) // Set fetched user data
        }
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
    getUsers()
  }, [])

  // Handle selection change
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = e.target.value
    const selectedUser = allUsers.find((user) => user._id === selectedUserId)
    if (selectedUser) {
      dispatch(
        setUser({
          id: selectedUser._id,
          name: selectedUser.Name || selectedUser.Email,
        })
      ) // Dispatch user selection to Redux
    }
  }

  return (
    <div>
      <label className="block text-gray-600 mb-2">Assigned To</label>
      <select
        name="AssignedTo"
        value={userSelect.id || ''} // Use selected user id from Redux state
        onChange={handleSelectChange} // Handle selection change
        className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">Select User</option>
        {allUsers.map((user, idx) => (
          <option key={idx} value={user._id}>
            {user.Name || user.Email}{' '}
            {/* Display name if available, else email */}
          </option>
        ))}
      </select>
    </div>
  )
}

export default AssignedUserSelect
