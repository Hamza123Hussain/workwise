import React, { useState } from 'react'
import toast from 'react-hot-toast'

const BreakMain = () => {
  const [onBreak, setOnBreak] = useState(false) // Break status
  const [breakStartTime, setBreakStartTime] = useState<Date | null>(null) // When break started
  const [breakDuration, setBreakDuration] = useState<number>(0) // Total break duration in seconds
  // Break button handler
  const handleBreak = () => {
    if (!onBreak) {
      // Start break
      setBreakStartTime(new Date())
      toast.success('Break started')
    } else {
      // End break and calculate break duration
      if (breakStartTime) {
        const breakEndTime = new Date()
        const breakTime =
          (breakEndTime.getTime() - breakStartTime.getTime()) / 1000 // break duration in seconds
        setBreakDuration(breakDuration + breakTime)
        toast.success('Break ended')
      }
    }
    setOnBreak(!onBreak)
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
      {onBreak && <p className="text-yellow-400 mt-2">On Break</p>}{' '}
    </>
  )
}

export default BreakMain
