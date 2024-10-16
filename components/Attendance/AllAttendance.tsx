import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../utils/Redux/Store/Store'
import { AttendanceRecord } from '../../utils/AttendanceInterface'
import Loader from '../Loader'
import MainTable from './MainTable'
import { getAttendance } from '@/functions/Frontend/AllAttendance'
const AllAttendance: React.FC = () => {
  const user = useSelector((state: RootState) => state.user)
  const [groupedAttendance, setGroupedAttendance] = useState<{
    [key: string]: AttendanceRecord[]
  }>({}) // Fixed type to correctly represent groupedAttendance
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (user.Email) {
      getAttendance(user.Email, setLoading, setGroupedAttendance)
    }
  }, [user.Email])
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    )
  }
  return (
    <div className="overflow-x-auto p-4 text-center w-[80vw] sm:w-auto mx-auto">
      <h1 className="text-xl sm:text-3xl md:text-4xl text-purpleGradientStart mt-20 px-2 text-center">
        ALL ATTENDANCE RECORDS
      </h1>
      <table className="w-full text-center my-5">
        <thead>
          <tr className="bg-purple-900">
            <th className="border border-purple-600 px-6 py-4 text-white  text-xs sm:text-base md:text-lg ">
              User Name
            </th>
            <th className="border border-purple-600 px-6 py-4 text-white text-xs sm:text-base md:text-lg">
              Attendance
            </th>
            <th className="border border-purple-600 px-6 py-4 text-white text-xs sm:text-base md:text-lg">
              Attendance Percentage
            </th>
          </tr>
        </thead>
        <MainTable groupedAttendance={groupedAttendance} />
      </table>
    </div>
  )
}
export default AllAttendance
