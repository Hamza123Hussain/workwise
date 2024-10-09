import Image from 'next/image'
import React from 'react'

const ReportHead = () => {
  return (
    <div className="flex flex-col justify-center items-center my-10">
      <Image
        width={350}
        height={350}
        src="/Logo.png"
        alt="Logo"
        className="cursor-pointer object-cover"
      />
      <h1 className="text-4xl text-white">
        Performance Report{' '}
        {new Date().toLocaleString('default', { month: 'long' })}{' '}
        {new Date().getFullYear()}
      </h1>
    </div>
  )
}

export default ReportHead
