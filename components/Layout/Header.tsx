import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className=" flex justify-center items-center mt-5">
      <Image
        width={250}
        height={250}
        src="/Logo.png"
        alt="Logo"
        className=" object-cover"
      />
    </div>
  )
}

export default Header
