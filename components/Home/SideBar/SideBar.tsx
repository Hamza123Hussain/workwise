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
      <button
        onClick={toggleSidebar}
        className="md:hidden p-2 text-[#8D6ED9] rounded-md absolute top-2 left-2 "
      >
        ☰
      </button>
      <div className="flex">
        <div
          className={`fixed inset-0 z-10 sm:z-0 bg-[#8D6ED9] border-r-2 transition-transform transform md:relative md:flex md:flex-col min-h-screen px-5 w-64 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:block`}
        >
          <button
            className="text-white md:hidden ml-auto "
            onClick={toggleSidebar}
          >
            &times;
          </button>

          <div className="flex flex-col space-y-4 px-4 my-5 items-start">
            <UserDetails />
            <SideBarLinks closeSidebar={toggleSidebar} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
