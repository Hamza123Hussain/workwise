import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../utils/Redux/Store/Store'
import { createNewAttendance } from '@/functions/Attendance/NewAttendance'
import { updateAttendance } from '@/functions/Attendance/UpdateAttendance'
import toast from 'react-hot-toast'
import { CurrentAttendance } from '@/functions/Attendance/CurrentAttendance'
import Loader from '../Loader'
import axios from 'axios'

const TimeBtn = () => {
  const User = useSelector((state: RootState) => state.user)
  const [loading, setLoading] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [checkinstatus, setCheckinStatus] = useState(false)
  const [attendanceId, setAttendanceId] = useState<string | null>(null)
  const [onBreak, setOnBreak] = useState(false) // Break status
  const [breakStartTime, setBreakStartTime] = useState<Date | null>(null) // When break started
  const [breakDuration, setBreakDuration] = useState<number>(0) // Total break duration in seconds

  const GetCurrentAttendance = async () => {
    setLoading(true)
    try {
      const Data = await CurrentAttendance(User.Email)
      if (Data) {
        setAttendanceId(Data[0]._id)
        setCheckinStatus(Data[0].CheckInStatus)
      } else {
        setAttendanceId(null)
        setCheckinStatus(false)
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setAttendanceId(null)
        setCheckinStatus(false)
      } else {
        console.error('Error getting current attendance:', error)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date())
    }
    const timerId = setInterval(updateTime, 1000)
    return () => clearInterval(timerId)
  }, [])

  useEffect(() => {
    GetCurrentAttendance()
  }, [User.Email])

  const user = useSelector((state: RootState) => state.user)

  const handleCheckInCheckOut = async () => {
    const time = currentTime.toISOString()
    if (!checkinstatus) {
      try {
        const newAttendance = await createNewAttendance({
          Email: user.Email,
          EntryTime: time,
          CheckInStatus: true,
        })
        setAttendanceId(newAttendance.attendance._id)
        toast.success('You have Checked In')
        setCheckinStatus(true)
      } catch (error) {
        console.error('Error during check-in:', error)
      }
    } else {
      if (attendanceId) {
        try {
          await updateAttendance({
            Email: user.Email,
            id: attendanceId,
            ExitTime: time,
            CheckInStatus: false,
          })
          toast.success('You have Checked OUT')
          setCheckinStatus(false)
        } catch (error) {
          console.error('Error during check-out:', error)
        }
      } else {
        console.error('Attendance ID not found for check-out.')
      }
    }
  }

  // Helper function to format break time in hours, minutes, and seconds
  const formatBreakTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = (totalSeconds % 60).toFixed(0)
    return `${hours}h ${minutes}m ${seconds}s`
  }

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
    <div className="bg-purple-black sm:w-4/12 h-fit p-6 rounded-lg shadow-md border-2 border-purple-600">
      {loading ? (
        <div className=" flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <p className="font-bold text-white">
            Date:
            <span className="text-lg text-white">
              {' '}
              {currentTime.toLocaleDateString()}
            </span>
          </p>
          <p className="font-bold text-white">
            Current Time:
            <span className="text-lg text-white">
              {' '}
              {currentTime.toLocaleTimeString()}
            </span>
          </p>
          <div className="flex gap-4 mt-2 justify-end">
            <button
              onClick={handleCheckInCheckOut}
              className={`${
                !checkinstatus ? 'bg-green-600' : 'bg-red-600'
              } text-white p-3 rounded-lg shadow hover:${
                !checkinstatus ? 'bg-green-800' : 'bg-red-900'
              } transition duration-200`}
            >
              {!checkinstatus ? 'Check In' : 'Check Out'}
            </button>
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
          </div>
          {onBreak && <p className="text-yellow-400 mt-2">On Break</p>}
          <p className="font-bold text-white">
            Total Break Duration:
            <span className="text-lg text-white">
              {' '}
              {formatBreakTime(breakDuration)}
            </span>
          </p>
        </>
      )}
    </div>
  )
}
export default TimeBtn
