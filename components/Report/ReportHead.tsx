import React from 'react'

const ReportHead = () => {
  return (
    <div className="flex flex-col justify-center items-center my-10">
      {/* <Image
        width={200}
        height={200}
        src="/Logo.png"
        alt="Logo"
        className="cursor-pointer object-cover mb-10"
      /> */}
      <h1 className="text-4xl text-black">
        Performance Report{' '}
        {new Date().toLocaleString('default', { month: 'long' })}{' '}
        {new Date().getFullYear()}
      </h1>
    </div>
  )
}

export default ReportHead
