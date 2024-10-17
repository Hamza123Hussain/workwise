import React from 'react'
import TaskStatus from './TaskStatus'
import TimeBtn from './TimeBtn'
import RecentTasks from '../Tasks/RecentTasks'
import Image from 'next/image'

const HomePage = () => {
  return (
    <div className="px-4 sm:px-6 w-full min-h-screen">
      {/* Welcome Message */}
      <div className="my-8 flex items-center justify-center">
        <Image
          width={400}
          height={200}
          src="/Logo.png"
          alt="Logo"
          className=" my-5"
          layout="fixed" // Ensures the image occupies the specified width and height
          placeholder="blur" // Adds a blur placeholder effect while loading
          blurDataURL="/Logo.png" // Optional: Add a low-resolution image for the blur effect
        />
      </div>
      {/* Main Content with Two Sections */}
      <div className="grid grid-cols-1 w-full gap-6 my-5">
        <div className="flex flex-col sm:flex-row gap-5">
          <TimeBtn />
          <TaskStatus />
        </div>
        <RecentTasks />
      </div>
    </div>
  )
}

export default HomePage
