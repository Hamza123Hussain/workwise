import { RootState } from '@/utils/Redux/Store/Store'
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'

const ShowUser = () => {
  const User = useSelector((state: RootState) => state.user)

  return (
    <div className="min-h-screen flex flex-col justify-center items-center  p-6 text-white">
      {' '}
      {/* Title */}
      <h1 className="text-7xl my-10 font-bold text-center text-purple-400">
        User Profile
      </h1>
      <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
        {/* User Info Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-700 pb-3">
            <h1 className="text-lg font-semibold text-purple-300">
              User Name:
            </h1>
            <h1 className="text-lg font-medium text-gray-100">{User.Name}</h1>
          </div>

          <div className="flex items-center justify-between border-b border-gray-700 pb-3">
            <h1 className="text-lg font-semibold text-purple-300">
              Job Description:
            </h1>
            <h1 className="text-lg font-medium text-gray-100">{User.Email}</h1>
          </div>

          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-purple-300">
              Profile Image:
            </h1>
            <Image
              src={User.imageUrl}
              width={60}
              height={60}
              alt="User Image"
              className="rounded-full border-2 border-purple-400"
            />
          </div>
        </div>

        {/* Update Profile Button */}
        <div className="flex justify-center">
          <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShowUser
