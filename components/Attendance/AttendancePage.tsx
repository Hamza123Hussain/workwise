import { getAttendance } from '@/functions/Frontend/GetUserAttendance'
import { AttendanceRecord } from '@/utils/Interfaces/AttendanceInterface'
import { RootState } from '@/utils/Redux/Store/Store'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../Loader'
import AttendanceTable from './AttendanceTable'
import SelectedMonths from '../Layout/SelectedMonths'
import { months } from '@/utils/Array/MonthsArray'
const AttendancePage = ({ type }: { type: string }) => {
  const [loading, setLoading] = useState(true)
  const [UserAttendance, setAttendance] = useState<AttendanceRecord[]>([])
  const User = useSelector((state: RootState) => state.user)
  const SelectedUser = useSelector((state: RootState) => state.Select)
  const Month = useSelector((state: RootState) => state.sort.Month)
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
        All {type} Records For {months[Month]} - {SelectedUser}
      </h2>
      <SelectedMonths />
      <AttendanceTable
        Attendance={UserAttendance.filter(
          (record) => new Date(record.currentDate).getMonth() === Month
        )}
      />
    </>
  )
}
export default AttendancePage
