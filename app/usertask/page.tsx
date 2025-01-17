'use client'
import React, { useEffect } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { motion } from 'framer-motion'
import Form from '@/components/Task/Create/Form/Form'
import { getUserTasks } from '@/functions/UserTasks/GetUserTasks'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/utils/Redux/Store/Store'
import {
  setOpen,
  setTasks,
} from '@/utils/Redux/Slice/UserTaskSlice/UsetTaskSlice'
import Layout from '@/components/Task/Card/Layout'

const UserTasks = () => {
  const User = useSelector((state: RootState) => state.user)
  const { open } = useSelector((state: RootState) => state.userTaskSlice)
  const dispatch = useDispatch<AppDispatch>()

  const GetUserTasks = async () => {
    const TasksFetched = await getUserTasks(User._id)
    if (TasksFetched) {
      dispatch(setTasks(TasksFetched)) // Store tasks in Redux
    }
  }

  useEffect(() => {
    if (User._id) {
      GetUserTasks()
    }
  }, [User._id])

  return (
    <div className="my-10 px-4 sm:px-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Tasks of {User.Name}
        </h1>
        <button
          onClick={() => dispatch(setOpen(true))}
          className="rounded bg-blue-600 px-6 py-3 text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Create Task
        </button>
      </div>

      {/* Modal for Task Creation */}
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

      {/* Task Cards Layout */}
      <Layout />
    </div>
  )
}

export default UserTasks
