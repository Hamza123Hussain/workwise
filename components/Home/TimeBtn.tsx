import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../utils/Redux/Store/Store'
import { createNewAttendance } from '@/functions/Attendance/NewAttendance'
import { updateAttendance } from '@/functions/Attendance/UpdateAttendance'
import toast from 'react-hot-toast'
const TimeBtn = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [checkinstatus, setCheckinStatus] = useState(false)
  const [attendanceId, setAttendanceId] = useState('')
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date())
    }
    const timerId = setInterval(updateTime, 1000)
    return () => clearInterval(timerId)
  }, [])
  const user = useSelector((state: RootState) => state.user)
  const handleCheckInCheckOut = async () => {
    const time = currentTime.toISOString() // Use ISO string for consistency with backend
    if (!checkinstatus) {
      try {
        const newAttendance = await createNewAttendance({
          Email: user.Email,
          EntryTime: time,
        })
        setAttendanceId(newAttendance.attendance._id) // Save the new attendance ID for future updates
        // console.log('Checked in successfully:', newAttendance)
        toast.success('You have Checked In')
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
          })
          // console.log('Checked out successfully:', updatedAttendance)
          toast.success('You have Checked In')
        } catch (error) {
          console.error('Error during check-out:', error)
        }
      } else {
        console.error('Attendance ID not found for check-out.')
      }
    }
    setCheckinStatus(!checkinstatus)
  }
  return (
    <div className="bg-purple-black w-4/12 p-6 rounded-lg shadow-md border-2 border-purple-600">
      <p className="font-bold">
        Date :
        <span className="text-lg text-white">
          {' '}
          {currentTime.toLocaleDateString()}
        </span>
      </p>
      <p className="font-bold">
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
