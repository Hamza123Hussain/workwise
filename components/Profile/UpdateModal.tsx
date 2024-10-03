import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import React from 'react'
import UpdateFields from './UpdateFields'

const UpdateModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md">
          Edit Profile
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black text-white">
        <DialogHeader></DialogHeader>
        <UpdateFields />
      </DialogContent>
    </Dialog>
  )
}
export default UpdateModal
