import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import CreateBody from './CreateBody'
const NoticeCreate = () => {
  return (
    <Dialog>
      <DialogTrigger className=" bg-blue-400 px-4 py-2 border-2 border-blue-500 rounded-lg text-white my-2">
        Create Notice
      </DialogTrigger>
      <DialogContent>
        <CreateBody />
      </DialogContent>
    </Dialog>
  )
}
export default NoticeCreate
