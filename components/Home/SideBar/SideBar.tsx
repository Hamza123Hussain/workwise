import React, { useState } from 'react'
import SideBarLinks from './SidebarLinks'
import UserDetails from '../UserDetails'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Hamburger Icon */}
      <button
        onClick={toggleSidebar}
        className="p-2 text-[#8D6ED9] rounded-md fixed top-2 left-2 z-20"
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 bg-[#8D6ED9] border-r-2 transition-transform transform min-h-screen px-5  ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button */}
        <button
          className="text-white ml-auto block p-2"
          onClick={toggleSidebar}
        >
          &times;
        </button>

        <div className="flex flex-col space-y-4 px-4 my-5 items-start">
          <UserDetails />
          <SideBarLinks closeSidebar={toggleSidebar} />
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 "
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  )
}

export default Sidebar
