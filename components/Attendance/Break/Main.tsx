import { handleBreakStartEnd } from '@/functions/Attendance/Checkout/BreakFunction'
import { RootState } from '@/utils/Redux/Store/Store'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const BreakMain = ({ attendanceId }: { attendanceId: string | null }) => {
  const [onBreak, setOnBreak] = useState(false) // Break status
  const [breakStartTime, setBreakStartTime] = useState<Date | null>(null) // When break started
  const [breakDuration, setBreakDuration] = useState<number>(0) // Total break duration in seconds
  const user = useSelector((state: RootState) => state.user) // Get user from redux store

  const handleBreak = async () => {
    if (!attendanceId) {
      toast.error('Attendance ID is missing') // Handle missing attendanceId
      return
    }
    try {
      await handleBreakStartEnd(
        user.Email,
        onBreak,
        breakStartTime,
        setBreakStartTime,
        setOnBreak,
        breakDuration,
        setBreakDuration,
        attendanceId
      )
    } catch (error) {
      toast.error('An error occurred during break handling') // Error handling
      console.error('Break handling error:', error)
    }
  }

  return (
    <button
      onClick={handleBreak}
      className={`${
        onBreak ? 'bg-orange-600' : 'bg-blue-600'
      } text-white p-4 rounded-lg shadow hover:${
        onBreak ? 'bg-orange-800' : 'bg-blue-800'
      } transition duration-200  w-full  flex items-center justify-center`}
    >
      {onBreak ? 'End Break' : 'Start Break'}
    </button>
  )
}

export default BreakMain
