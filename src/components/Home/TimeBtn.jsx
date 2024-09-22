import React, { useState, useEffect } from 'react'

const TimeBtn = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date())
    }
    const timerId = setInterval(updateTime, 1000) // Update time every second
    return () => clearInterval(timerId) // Cleanup the interval on unmount
  }, [])
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="font-semibold text-2xl text-[#003366]">Current Status</h2>
      <div className="mt-4">
        <p className="font-bold">
          Date:
          <span className="text-lg text-gray-700">
            {' '}
            {currentTime.toLocaleDateString()}
          </span>
        </p>
        <p className="font-bold">
          Current Time:
          <span className="text-lg text-gray-700">
            {' '}
            {currentTime.toLocaleTimeString()}
          </span>
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
