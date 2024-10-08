import { Allusers } from '@/functions/AUTH/Allusers'
import { RootState } from '@/utils/Redux/Store/Store'
import { UserFetched } from '@/utils/SignUpInterface'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
const UserAssign = ({
  value,
  handleChange,
}: {
  value: string
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void
}) => {
  const User = useSelector((state: RootState) => state.user)
  const GetUsers = async () => {
    const Data = await Allusers(User.Email)
    if (Data) {
      SetUserFetched(Data)
    }
  }
  useEffect(() => {
    GetUsers()
  }, [])

  const [UserFetched, SetUserFetched] = useState<UserFetched[]>([])
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-2 text-purple-400">
        Assigned To
      </label>
      <select
        name="assignedTo"
        className="w-full p-3 rounded-lg shadow-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        value={value}
        onChange={handleChange}
        required
      >
        <option value="">Select a user</option>
        {User.Email === 'octtoppus1@gmail.com' ? (
          <option value={User.Name}>{User.Name}</option>
        ) : (
          UserFetched.map((element) => (
            <option key={element.Email} value={element.Name}>
              {element.Name}
            </option>
          ))
        )}
      </select>
    </div>
  )
}
export default UserAssign
