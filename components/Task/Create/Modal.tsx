import React from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { motion } from 'framer-motion'
import Form from '@/components/Task/Create/Form/Form'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/utils/Redux/Store/Store'
import { setOpen } from '@/utils/Redux/Slice/UserTaskSlice/UsetTaskSlice'
const ModalForTaskCreation = () => {
  const { open } = useSelector((state: RootState) => state.userTaskSlice)
  const dispatch = useDispatch<AppDispatch>()
  return (
    <Dialog
      onClose={() => dispatch(setOpen(false))}
      open={open}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 flex items-center justify-center p-4"
      >
        <DialogPanel className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl space-y-4">
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Create New Task
          </DialogTitle>
          <Form />
        </DialogPanel>
      </motion.div>
    </Dialog>
  )
}

export default ModalForTaskCreation
