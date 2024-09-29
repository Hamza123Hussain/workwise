import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../utils/Redux/Store/Store'
import { GetAllAttendance } from '../../functions/Attendance/AllAttendance'
import { AttendanceRecord } from '../../utils/AttendanceInterface'
import AttendanceTable from './AttendanceTable'
import { countUniqueDates } from '../../functions/Attendance/UniqueDateFunction'
const AllAttendance: React.FC = () => {
  const user = useSelector((state: RootState) => state.user)
  const [allAttendance, setAttendance] = useState<AttendanceRecord[]>([])
  // Fetch attendance data
  const getAttendance = async () => {
    try {
      const data = await GetAllAttendance(user.Email)
      if (data) {
        setAttendance(data)
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
  if (!user.Email) {
    return (
      <div className="container mx-auto px-4 py-6">
        Please log in to view attendance records.
      </div>
    )
  }

  return <AttendanceTable Attendance={allAttendance} />
}
export default AllAttendance
