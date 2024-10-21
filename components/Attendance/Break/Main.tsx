import { handleBreakStartEnd } from '@/functions/Attendance/Checkout/BreakFunction'
import { RootState } from '@/utils/Redux/Store/Store'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
const BreakMain = ({
  attendanceId,
  onBreak,
  setOnBreak,
}: {
  attendanceId: string | null
  onBreak: boolean
  setOnBreak: (status: boolean) => void
}) => {
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
        onBreak ? 'bg-[#FFB299]' : 'bg-[#FFEB3B]' // Coral for end break, Sunny Yellow for start break
      } text-white p-4 rounded-lg shadow hover:${
        onBreak ? 'bg-[#FF6F61]' : 'bg-[#FFD700]' // Darker Coral on hover, Bright Gold for hover on Sunny Yellow
      } transition duration-200 w-full flex items-center justify-center`}
    >
      {onBreak ? 'End Break' : 'Start Break'}
    </button>
  )
}
export default BreakMain
