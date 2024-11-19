import { RootState } from '@/utils/Redux/Store/Store'
import React from 'react'
import { useSelector } from 'react-redux'
import UpdateModal from './UpdateModal'
import UserField from './UserField'
const ShowUser = () => {
  const User = useSelector((state: RootState) => state.user)
  console.log(User)
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-gray-100">
      <h1 className="text-4xl my-8 font-semibold text-center text-gray-900">
        User Profile
      </h1>
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6 space-y-6">
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
