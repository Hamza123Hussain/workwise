import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import React from 'react'
import UpdateFields from './UpdateFields'
import { UserFetched } from '@/utils/SignUpInterface'

const UpdateModal = ({ User }: { User?: UserFetched }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300">
          Edit Profile
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] bg-gray-50 text-gray-900 rounded-lg p-6 sm:p-4 overflow-auto space-y-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-indigo-600">
            Update Profile
          </DialogTitle>
        </DialogHeader>
        <UpdateFields User={User} />
      </DialogContent>
    </Dialog>
  )
}

export default UpdateModal
