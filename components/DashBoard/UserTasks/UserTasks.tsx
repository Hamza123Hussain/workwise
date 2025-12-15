'use client'
import React from 'react'
import { AppDispatch } from '@/utils/Redux/Store/Store'
import { useDispatch } from 'react-redux'
import Tasks from './Tasks'
import ModalForTaskCreation from '@/components/Task/Create/Modal'
import { setOpen } from '@/utils/Redux/Slice/UserTaskSlice/UsetTaskSlice'
const UserTask = () => {
  const dispatch = useDispatch<AppDispatch>()
  return (
    <div className="flex flex-col gap-[10px] py-5 px-[10px] rounded-[20px] bg-[#F3E5FF]">
      <div className=" flex justify-between items-center">
        <span className="text-[24px] font-bold text-[#584767]">Task</span>
        <button
          onClick={() => dispatch(setOpen(true))}
          className="rounded bg-blue-600 px-6 py-3 text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Create Task
        </button>
      </div>
      <ModalForTaskCreation />
      <div className="bg-white rounded-[8px] w-full overflow-hidden shadow-sm border border-[#EAEAEA]">
        {/* Header */}
        <div className="flex justify-between items-center bg-[#F7F4FF] border-b border-[#E0D8FF] px-4 py-2 font-semibold text-[#584767] text-[14px]">
          <span className="w-[25%]">Project Name</span>
          <span className="w-[20%] text-center">Due Date</span>
          <span className="w-[35%] text-center">Notes</span>
          <span className="w-[20%] text-center">Status</span>
        </div>
        <Tasks />
      </div>
    </div>
  )
}
export default UserTask
