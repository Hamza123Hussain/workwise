import { handleBreakStartEnd } from '@/functions/Attendance/Checkout/BreakFunction'
import React, { useState } from 'react'

const BreakMain: React.FC = () => {
  const [onBreak, setOnBreak] = useState(false) // Break status
  const [breakStartTime, setBreakStartTime] = useState<Date | null>(null) // When break started
  const [breakDuration, setBreakDuration] = useState<number>(0) // Total break duration in seconds

  const handleBreak = () => {
    handleBreakStartEnd(
      onBreak,
      breakStartTime,
      setBreakStartTime,
      setOnBreak,
      breakDuration,
      setBreakDuration
    )
  }

  return (
    <>
      <button
        onClick={handleBreak}
        className={`${
          onBreak ? 'bg-orange-600' : 'bg-blue-600'
        } text-white p-3 rounded-lg shadow hover:${
          onBreak ? 'bg-orange-800' : 'bg-blue-800'
        } transition duration-200`}
      >
        {onBreak ? 'End Break' : 'Start Break'}
      </button>
      {onBreak && <p className="text-yellow-400 mt-2">On Break</p>}
      <p>Total Break Duration: {Math.floor(breakDuration)} seconds</p>
    </>
  )
}

export default BreakMain
