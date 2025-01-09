import { UserFetched } from '@/utils/Interfaces/SignUpInterface'
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
      toast.error(`User is not being deleted: ${error}`)
    }
  }

  return (
    <div className="relative bg-[#bd8bff] text-white rounded-lg shadow-lg p-6 w-72 mx-auto transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      {/* User Info Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
          {User.imageUrl ? (
            <Image
              src={User.imageUrl}
              alt={User.Name}
              width={80}
              height={80}
              className="rounded-full"
            />
          ) : (
            <span className="text-xl font-bold text-white">
              {User.Name.charAt(0)}
            </span>
          )}
        </div>
        <div className="ml-4 flex-grow">
          <h2 className="text-lg font-bold">{User.Name}</h2>
          <p className="text-sm text-white">{User.JobTitle || 'N/A'}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <UpdateModal User={User} />
        <button
          onClick={DeleteMe}
          className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default UserCard
