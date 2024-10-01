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
        // If it's a 404 error, handle it appropriately
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
    const time = currentTime.toISOString() // Use ISO string for consistency with backend
    if (!checkinstatus) {
      // Check-in process
      try {
        const newAttendance = await createNewAttendance({
          Email: user.Email,
          EntryTime: time,
          CheckInStatus: true,
        })
        setAttendanceId(newAttendance.attendance._id) // Save the new attendance I
        toast.success('You have Checked In')
        setCheckinStatus(true) // Update status to checked in
      } catch (error) {
        console.error('Error during check-in:', error)
      }
    } else {
      // Check-out process
      if (attendanceId) {
        try {
          await updateAttendance({
            Email: user.Email,
            id: attendanceId,
            ExitTime: time,
            CheckInStatus: false,
          })
          toast.success('You have Checked OUT')
          setCheckinStatus(false) // Update status to checked out
        } catch (error) {
          console.error('Error during check-out:', error)
        }
      } else {
        console.error('Attendance ID not found for check-out.')
      }
    }
  }
  return loading ? (
    <div className=" flex justify-center items-center">
      <Loader />
    </div>
  ) : (
    <div className="bg-purple-black w-4/12 p-6 rounded-lg shadow-md border-2 border-purple-600">
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
      </div>
    </div>
  )
}
export default TimeBtn
