import { getAttendance } from '@/functions/Frontend/GetUserAttendance'
import { AttendanceRecord } from '@/utils/AttendanceInterface'
import { RootState } from '@/utils/Redux/Store/Store'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../Loader'
import AttendanceTable from './AttendanceTable'
const AttendancePage = () => {
  const [loading, setLoading] = useState(true)
  const [UserAttendance, setAttendance] = useState<AttendanceRecord[]>([])
  const User = useSelector((state: RootState) => state.user)
  const SelectedUser = useSelector((state: RootState) => state.Select)
  const fetchAttendance = async () => {
    const attendance = await getAttendance(setLoading, User.Email, SelectedUser)
    setAttendance(attendance) // Update attendance state
    setLoading(false) // Stop loading after fetching is complete
  }
  useEffect(() => {
    if (SelectedUser) {
      fetchAttendance()
    }
  }, [SelectedUser])
  if (loading)
    return (
      <div className=" flex min-h-screen justify-center items-center">
        <Loader />
      </div>
    )
  return <AttendanceTable Attendance={UserAttendance} />
}

export default AttendancePage
