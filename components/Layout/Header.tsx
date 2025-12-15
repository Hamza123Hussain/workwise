'use client'
import React from 'react'
import Image from 'next/image'
const Header = () => {
  return (
    <div className="relative flex items-center justify-between bg-[#E9E9E9]">
      {/* Left Logo */}
      <div className="flex items-center p-2 gap-2">
        <Image
          className="mt-2"
          src={'/Logo.png'}
          width={150}
          height={150}
          alt="Logo"
        />
        <h6 className="mt-3 text-black font-extrabold"> | </h6>
        <h6 className="mt-4 text-black font-extrabold">HRM</h6>
      </div>
    </div>
  )
}

export default Header
