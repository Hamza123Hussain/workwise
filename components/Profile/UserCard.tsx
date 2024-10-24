import { UserFetched } from '@/utils/SignUpInterface'
import Image from 'next/image'
import React from 'react'
import UpdateModal from './UpdateModal'
import toast from 'react-hot-toast'
import deleteUser from '@/functions/AUTH/DeleteUser'
import { useRouter } from 'next/navigation'
const UserCard = ({ User }: { User: UserFetched }) => {
  const Router = useRouter()
  const DeleteMe = async () => {
    try {
      const Data = await deleteUser(User.Email)
      if (Data) {
        toast.success('User Has Been Deleted')
        Router.push('/')
      }
    } catch (error) {
      toast.error(`user is not being deleted : ${error}`)
    }
  }
  return (
    <div className="bg-[#ac7ff9] text-white p-4 rounded-lg mx-auto shadow-lg flex flex-col w-64 sm:w-96 items-center border border-purple-700 ">
      {/* User Info Section */}
      <div className="sm:flex sm:items-center sm:space-x-4">
        <div className="flex-shrink-0">
          {User.imageUrl ? (
            <Image
              src={User.imageUrl}
              alt={User.Name}
              width={60}
              height={60}
              className=" rounded-full"
            />
          ) : (
            <div className="w-20 h-20 rounded-full  flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {User.Name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <div className="mt-4 sm:mt-0">
          <h2 className="text-xl font-bold text-white">{User.Name}</h2>
          <p className="text-sm text-white">Email: {User.Email}</p>
          <p className="text-sm text-white">Title: {User.JobTitle || 'N/A'}</p>
          <p className="text-sm text-white">Salary: PKR {User.Salary}</p>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="mt-4 flex-col sm:flex-row  flex items-center gap-2 ">
        <UpdateModal />
        <button
          onClick={DeleteMe}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-500 transition duration-300 sm:w-auto sm:self-end"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
export default UserCard
