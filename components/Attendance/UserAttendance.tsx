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
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  )
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
        Attendance Records for {months[selectedMonth]} - {user.Name}
      </h2>
      <SelectedMonths
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      {!loading && userAttendance.length === 0 ? (
        <NoAttendance />
      ) : (
        <>
          <AttendanceTable
            Attendance={userAttendance.filter(
              (record) =>
                new Date(record.currentDate).getMonth() === selectedMonth
            )}
          />
        </>
      )}
    </div>
  )
}
export default UserAttendance
