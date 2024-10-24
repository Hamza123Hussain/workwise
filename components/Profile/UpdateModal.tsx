import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import React from 'react'
import UpdateFields from './UpdateFields'

const UpdateModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-white hover:bg-purple-700 text-[#b383ff] font-semibold py-2 px-4 rounded-md">
          Edit Profile
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-fit bg-black text-white">
        <DialogHeader>
          <DialogTitle className="text-purple-500">
            Update The Profile
          </DialogTitle>
        </DialogHeader>
        <UpdateFields />
      </DialogContent>
    </Dialog>
  )
}
export default UpdateModal
