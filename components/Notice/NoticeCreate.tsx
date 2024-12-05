import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
const NoticeCreate = () => {
  return (
    <Dialog>
      <DialogTrigger className=" bg-blue-400 px-4 py-2 border-2 border-blue-500 rounded-lg text-white my-2">
        Create Notice
      </DialogTrigger>
      <DialogContent>
        <DialogHeader></DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
export default NoticeCreate
