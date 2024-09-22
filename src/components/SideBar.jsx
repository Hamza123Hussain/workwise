import React, { useState } from 'react'
import SidebarLinks from './SidebarLinks'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="flex">
      {/* Hamburger button for mobile */}
      <button
        className="md:hidden p-2 text-white bg-[#003366] "
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-[#003366] transition-transform transform md:relative md:flex md:flex-col md:justify-between w-64 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:block`}
      >
        {/* Logo and Title */}
        <div className="flex items-center">
          <img src="/Logo.png" alt="Logo" className="w-24" />
          <div className="text-white text-2xl font-extrabold ">WorkWise</div>
          <button
            className="text-white md:hidden ml-auto"
            onClick={toggleSidebar}
          >
            &times;
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col gap-5 items-start ">
          <SidebarLinks />
        </div>

        {/* User Details Section */}
        <div className="text-white p-4 md:mt-auto">User Details</div>
      </div>
    </div>
  )
}

export default Sidebar
