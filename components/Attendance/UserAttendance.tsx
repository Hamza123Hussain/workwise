import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../utils/Redux/Store/Store'
import { AttendanceRecord } from '../../utils/AttendanceInterface'
import AttendanceTable from './AttendanceTable'
import Loader from '../Loader'
import { GetUserAttendance } from '@/functions/Attendance/UserAttendance'
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

  return <AttendanceTable Attendance={UserAttendance} />
}
export default UserAttendance
