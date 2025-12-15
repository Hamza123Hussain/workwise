'use client'
import React, { useEffect, useState } from 'react'
import ToggleAttendanceButton from './ToggleAttendanceButton'

const AttendanceButton = () => {
  const [currentTime, setCurrentTime] = useState<string>('')
  const [currentDate, setCurrentDate] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()

      // Format time → HH : MM : SS
      const time = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })

      // Format date → Thursday - 25 Sept 2025
      const date = now.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })

      setCurrentTime(time.replace(/\./g, ':')) // ensure colons on all systems
      setCurrentDate(date)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-[#FEFEFE] px-4 flex justify-between rounded-[4px] mb-5">
      <div className="flex flex-col py-[10px]">
        <h3 className="text-[#475467] font-medium text-[12px]">
          {currentDate}
        </h3>
        <h4 className="text-[24px] font-semibold text-[#161B23]">
          {currentTime}
        </h4>
      </div>

      <ToggleAttendanceButton />
    </div>
  )
}

export default AttendanceButton
