import React, { useState } from 'react'
import SideBarLinks from './SidebarLinks'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const Router = useRouter()

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {' '}
      <button
        onClick={toggleSidebar}
        className="md:hidden p-2 text-purple-600 rounded-md absolute top-2 left-2 "
      >
        ☰
      </button>
      <div className="flex">
        <div
          className={`fixed inset-0 bg-purple-black border-r-2 transition-transform transform md:relative md:flex md:flex-col min-h-screen p-5 w-64 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:block`}
        >
          <div className="flex items-center">
            <Image
              onClick={() => Router.push('/')}
              width={150}
              height={150}
              src="/Logo.png"
              alt="Logo"
              className="cursor-pointer object-cover"
            />
            <button
              className="text-white md:hidden ml-auto"
              onClick={toggleSidebar}
            >
              &times;
            </button>
          </div>
          <div className="flex flex-col space-y-5 px-4 my-5 items-start">
            <SideBarLinks />
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
