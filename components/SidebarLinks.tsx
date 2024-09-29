import React from 'react'

const SidebarLinks = () => {
  return (
    <div className="flex flex-col p-4 space-y-5 w-full">
      <a
        href="/"
        className="text-white hover:text-[#FF5733]  hover:rounded-lg hover:px-2"
      >
        Home
      </a>
      <a
        href="/CreateTask"
        className="text-white hover:text-[#FF5733]  hover:rounded-lg hover:px-2"
      >
        Create Task
      </a>
      <a
        href="#"
        className="text-white hover:text-[#FF5733]  hover:rounded-lg hover:px-2"
      >
        Tasks
      </a>
      <a
        href="#"
        className="text-white hover:text-[#FF5733]  hover:rounded-lg hover:px-2"
      >
        User Attendance
      </a>
      <a
        href="/AllAttendance"
        className="text-white hover:text-[#FF5733]  hover:rounded-lg hover:px-2"
      >
        Total Attendance
      </a>
      <a
        href="#"
        className="text-white hover:text-[#FF5733]  hover:rounded-lg hover:px-2"
      >
        Report
      </a>
      <a
        href="#"
        className="text-white hover:text-[#FF5733]  hover:rounded-lg hover:px-2"
      >
        Profile
      </a>
    </div>
  )
}

export default SidebarLinks
