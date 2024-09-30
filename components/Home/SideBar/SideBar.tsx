import React, { useState } from 'react'

import UserDetails from '../UserDetails'
import SideBarLinks from './SidebarLinks'
import Image from 'next/image'
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div className="flex ">
      {/* Hamburger button for mobile */}
      <button
        className="md:hidden p-2 text-white bg-logo-gradient "
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-0  bg-purple-black  border-r-2 transition-transform transform md:relative md:flex md:flex-col min-h-screen p-5   ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:block`}
      >
        {/* Logo and Title */}
        <div className="flex items-center">
          <Image
            width={150}
            height={150}
            src="/Logo.png"
            alt="Logo"
            className=" object-cover"
          />

          <button
            className="text-white md:hidden ml-auto"
            onClick={toggleSidebar}
          >
            &times;
          </button>
        </div>
        {/* Sidebar Links */}
        <div className="flex flex-col space-y-5 px-4 my-5 items-start ">
          <SideBarLinks />
        </div>
        {/* User Details Section */}
        <div className="text-white p-4 md:mt-auto md:mb-28 ">
          <UserDetails />
        </div>
      </div>
    </div>
  )
}
export default Sidebar
