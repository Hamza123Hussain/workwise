import React from 'react'
import RecentTasks from './Home/RecentTasks'
import TaskStatus from './Home/TaskStatus'
import TimeBtn from './Home/TimeBtn'
import CreateTaskForm from './Tasks/CreateTask'
const HomePage = () => {
  return (
    <div className=" px-2  bg-gray-100 w-full ">
      {/* Welcome Message */}
      <div className="mb-8 flex items-center justify-center">
        <img src="/Logo.png" className=" w-24 sm:w-52" alt="" />
        <h1 className=" text-3xl sm:text-5xl text-center font-bold text-[#003366]">
          WorkWise
        </h1>
      </div>
      {/* Main Content with Two Sections */}
      <div className="grid grid-cols-1  w-full gap-6 my-5">
        <div className=" flex gap-2">
          <TimeBtn />
          <TaskStatus />
        </div>
        <CreateTaskForm />
      </div>
    </div>
  )
}

export default HomePage
