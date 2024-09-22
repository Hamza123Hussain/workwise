import React from 'react'

const TimeBtn = () => {
  const currentTime = new Date().toLocaleTimeString()
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="font-semibold text-2xl text-[#003366]">Current Status</h2>
      <div className="mt-4">
        <p className="font-bold">
          Current Time:{' '}
          <span className="text-lg text-gray-700">{currentTime}</span>
        </p>
        <div className="flex gap-4 mt-2">
          <button className="bg-[#FF5733] text-white p-3 rounded-lg shadow hover:bg-[#e84e24] transition duration-200">
            Check In
          </button>
          <button className="bg-[#FF5733] text-white p-3 rounded-lg shadow hover:bg-[#e84e24] transition duration-200">
            Check Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default TimeBtn
