import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../utils/Redux/Store/Store'
import { AttendanceRecord } from '../../utils/AttendanceInterface'
import AttendanceTable from './AttendanceTable'
import Loader from '../Loader'
import { GetUserAttendance } from '@/functions/Attendance/UserAttendance'
import Attendance from '@/app/AllAttendance/page'
const UserAttendance: React.FC = () => {
  const user = useSelector((state: RootState) => state.user)
  const [UserAttendance, setAttendance] = useState<AttendanceRecord[]>([])
  const [loading, setloading] = useState(false)
  const getAttendance = async () => {
    setloading(true)
    try {
      const data = await GetUserAttendance(user.Email)
      if (data) {
        setAttendance(data)
        setloading(false)
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    if (user.Email) {
      getAttendance()
    }
  }, [user.Email])
  if (loading) {
    return (
      <div className=" min-h-screen flex justify-center items-center">
        {' '}
        <Loader />
      </div>
    )
  }

  return Attendance.length > 0 ? (
    <AttendanceTable Attendance={UserAttendance} />
  ) : (
    <div className=" min-h-screen text-center">
      {' '}
      <h1 className=" text-6xl text-white">NO ATTENDANCE RECORDS FOUND</h1>
    </div>
  )
}
export default UserAttendance
