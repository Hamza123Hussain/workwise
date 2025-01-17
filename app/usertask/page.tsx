'use client'
import React, { useEffect } from 'react'
import { getUserTasks } from '@/functions/UserTasks/GetUserTasks'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/utils/Redux/Store/Store'
import {
  setOpen,
  setTasks,
} from '@/utils/Redux/Slice/UserTaskSlice/UsetTaskSlice'
import Layout from '@/components/Task/Card/Layout'
import ModalForTaskCreation from '@/components/Task/Create/Modal'
const UserTasks = () => {
  const User = useSelector((state: RootState) => state.user)
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
      <ModalForTaskCreation />
      {/* Task Cards Layout */}
      <Layout />
    </div>
  )
}
export default UserTasks
