import { handleBreakStartEnd } from '@/functions/Attendance/Checkout/BreakFunction'
import { RootState } from '@/utils/Redux/Store/Store'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { FaPause, FaPlay } from 'react-icons/fa'
import clsx from 'clsx'

const BreakMain = ({
  attendanceId,
  onBreak,
  setOnBreak,
}: {
  attendanceId: string | null
  onBreak: boolean
  setOnBreak: (status: boolean) => void
}) => {
  const [breakStartTime, setBreakStartTime] = useState<Date | null>(null)
  const [breakDuration, setBreakDuration] = useState<number>(0)
  const user = useSelector((state: RootState) => state.user)

  const handleBreak = async () => {
    if (!attendanceId) {
      toast.error('Attendance ID is missing')
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
      toast.error('An error occurred during break handling')
      console.error('Break handling error:', error)
    }
  }

  return (
    <button
      onClick={handleBreak}
      className={clsx(
        'p-4 rounded-lg text-white flex items-center justify-center w-full transition duration-300 ease-in-out transform hover:scale-105',
        {
          'bg-[#8c5bff] hover:bg-[#6a3ff1]': !onBreak, // Start Break
          'bg-[#5b3e8c] hover:bg-[#402a64]': onBreak, // End Break
        }
      )}
    >
      <span className="mr-3">
        {!onBreak ? (
          <FaPlay className="text-white text-xl" />
        ) : (
          <FaPause className="text-white text-xl" />
        )}
      </span>
      <span className="font-semibold text-lg">
        {!onBreak ? 'Start Break' : 'End Break'}
      </span>
    </button>
  )
}

export default BreakMain
