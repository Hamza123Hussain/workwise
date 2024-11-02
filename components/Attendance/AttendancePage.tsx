import { getAttendance } from '@/functions/Frontend/GetUserAttendance'
import { AttendanceRecord } from '@/utils/AttendanceInterface'
import { RootState } from '@/utils/Redux/Store/Store'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../Loader'
import AttendanceTable from './AttendanceTable'
import SelectedMonths from '../Layout/SelectedMonths'
import { months } from '@/utils/MonthsArray'
const AttendancePage = ({ type }: { type: string }) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  )
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
  return (
    <>
      {' '}
      <h2 className="text-2xl font-semibold mb-4 text-[#c27cff] text-center">
        All {type} Records For {months[selectedMonth]} - {SelectedUser}
      </h2>
      <SelectedMonths
        setSelectedMonth={setSelectedMonth}
        selectedMonth={selectedMonth}
      />
      <AttendanceTable
        Attendance={UserAttendance.filter(
          (record) => new Date(record.currentDate).getMonth() === selectedMonth
        )}
      />
    </>
  )
}
export default AttendancePage
