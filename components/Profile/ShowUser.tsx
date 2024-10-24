import { RootState } from '@/utils/Redux/Store/Store'
import React from 'react'
import { useSelector } from 'react-redux'
import UpdateModal from './UpdateModal'
import UserField from './UserField'
const ShowUser = () => {
  const User = useSelector((state: RootState) => state.user)
  console.log(User)
  return (
    <div className="min-h-screen flex flex-col justify-center items-center w-[90vw] sm:w-auto  p-6 text-white">
      <h1 className="text-7xl my-10 font-bold text-center text-purple-400">
        User Profile
      </h1>
      <div className="w-full max-w-lg bg-[#bd97ff] rounded-lg shadow-md p-6 space-y-6">
        {/* User Info Section */}
        <div className="space-y-4">
          <UserField Attribute={User.Name} Name="User Name" />
          <UserField Attribute={User.Email} Name="User Email" />
          <UserField Attribute={User.JobTitle} Name="Job Title" />
          <UserField Attribute={User.Salary} Name="Salary" />
          <UserField Attribute={User.imageUrl} Name="User Image" />
        </div>
        {/* Update Profile Button */}
        <div className="flex justify-center">
          <UpdateModal />
        </div>
      </div>
    </div>
  )
}
export default ShowUser
