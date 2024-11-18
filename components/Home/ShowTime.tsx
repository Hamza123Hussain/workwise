import React, { useState, useEffect } from 'react'
import Clock from 'react-clock'
import 'react-clock/dist/Clock.css'

const AnalogClock = () => {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Format time for the display at the bottom
  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-4 sm:p-6 md:p-8 rounded-lg max-w-xs sm:max-w-md lg:max-w-lg mx-auto">
      <div className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80">
        <Clock value={date} size="100%" renderNumbers={true} />
        {/* Stylish border */}
        <div className="absolute inset-0 rounded-full border-8 border-white opacity-40"></div>
      </div>

      {/* Display time in a stylish way below the clock */}
      <p className="text-sm sm:text-lg font-semibold text-black">
        {formatTime(date)}
      </p>
    </div>
  )
}

export default AnalogClock
