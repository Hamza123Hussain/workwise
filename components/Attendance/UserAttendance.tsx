import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../utils/Redux/Store/Store'
import { AttendanceRecord } from '../../utils/AttendanceInterface'
import AttendanceTable from './AttendanceTable'
import Loader from '../Loader'
import { getAttendance } from '@/functions/Frontend/GetUserAttendance'
import SelectedMonths from '../Layout/SelectedMonths'
import NoAttendance from './NoAttendance'
import { months } from '@/utils/MonthsArray'

const UserAttendance: React.FC = () => {
  const user = useSelector((state: RootState) => state.user)
  const [userAttendance, setAttendance] = useState<AttendanceRecord[]>([])
  const [loading, setLoading] = useState(true)
  const Month = useSelector((state: RootState) => state.sort.Month)

  useEffect(() => {
    const fetchAttendance = async () => {
      if (user.Email) {
        setLoading(true)
        const attendance = await getAttendance(
          setLoading,
          user.Email,
          user.Name
        )
        setAttendance(attendance)
        setLoading(false)
      }
    }
    fetchAttendance()
  }, [user])

  // Sort the records to get the latest one
  const filteredAttendance = userAttendance.filter(
    (record) => new Date(record.currentDate).getMonth() === Month
  )

  const latestAttendance = filteredAttendance.sort(
    (a, b) =>
      new Date(b.currentDate).getTime() - new Date(a.currentDate).getTime()
  )[0] // Get the latest record

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-[#c27cff] text-center">
        Attendance Records for {months[Month]} - {user.Name}
      </h2>
      <SelectedMonths />

      {/* Show the latest attendance record if it exists */}
      {latestAttendance ? <div className="mb-4"></div> : <NoAttendance />}

      {/* If there are multiple attendance records, show the table */}
      {filteredAttendance.length > 1 && (
        <AttendanceTable Attendance={filteredAttendance} />
      )}
    </div>
  )
}

export default UserAttendance
