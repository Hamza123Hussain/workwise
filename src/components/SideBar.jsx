import React, { useState } from 'react'
import SidebarLinks from './SidebarLinks'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="flex w-1/5 ">
      {/* Hamburger button for mobile */}
      <button
        className="md:hidden p-2 text-white bg-[#003366] "
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-0  bg-[#003366] transition-transform transform md:relative md:flex md:flex-col md:justify-between w-full  ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:block `}
      >
        <div className=" flex flex-col gap-5 items-start">
          <div className="flex items-center justify-start  ">
            <img src="/Logo.png" alt="Logo" className=" w-28" />
            <div className="text-white text-xl font-extrabold ">WorkWise</div>
            <button className="text-white md:hidden" onClick={toggleSidebar}>
              &times;
            </button>
          </div>
          <SidebarLinks />
        </div>
        <div>user details</div>
      </div>
    </div>
  )
}

export default Sidebar
