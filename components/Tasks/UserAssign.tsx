import { Allusers } from '@/functions/AUTH/Allusers'
import { RootState } from '@/utils/Redux/Store/Store'
import { UserFetched } from '@/utils/SignUpInterface'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const UserAssign = ({
  value,
  handleChange,
}: {
  value: string[] // Update to array for multiple selection support
  handleChange: (selectedUser: string) => void
}) => {
  const User = useSelector((state: RootState) => state.user)
  const [UserFetched, SetUserFetched] = useState<UserFetched[]>([])

  const GetUsers = async () => {
    const Data = await Allusers(User.Email)
    if (Data) {
      SetUserFetched(Data)
    }
  }

  useEffect(() => {
    GetUsers()
  }, [])

  return (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-2 text-purple-400">
        Assigned To
      </label>
      <div className="flex flex-wrap gap-2">
        {UserFetched.map((element) => {
          const isSelected = value.includes(element.Name)
          return (
            <div
              key={element.Email}
              onClick={() => handleChange(element.Name)}
              className={`cursor-pointer p-2 rounded-full text-sm font-medium 
                ${
                  isSelected
                    ? 'bg-purple-500 text-white'
                    : 'bg-purple-200 text-[#a078ff]'
                }`}
            >
              {element.Name}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default UserAssign
