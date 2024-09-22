import React, { useState } from 'react'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="flex w-1/6">
      {/* Hamburger button for mobile */}
      <button
        className="md:hidden p-2 text-white bg-[#003366] "
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-0  bg-[#003366] transition-transform transform md:relative md:flex md:flex-col w-full  ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:block`}
      >
        <div className="flex items-center justify-between p-4">
          <div className="text-white text-xl font-bold">WorkWise</div>
          <button className="text-white md:hidden" onClick={toggleSidebar}>
            &times;
          </button>
        </div>
        <div className="flex flex-col p-4 space-y-2">
          <a href="#" className="text-white hover:text-[#FF5733]">
            Home
          </a>
          <a href="#" className="text-white hover:text-[#FF5733]">
            Tasks
          </a>
          <a href="#" className="text-white hover:text-[#FF5733]">
            Check In/Out
          </a>
          <a href="#" className="text-white hover:text-[#FF5733]">
            Profile
          </a>
          <a href="#" className="text-white hover:text-[#FF5733]">
            Logout
          </a>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
