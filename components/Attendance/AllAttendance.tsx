import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../utils/Redux/Store/Store'
import { AttendanceRecord } from '../../utils/AttendanceInterface'
import Loader from '../Loader'
import MainTable from './MainTable'
import { getAttendance } from '@/functions/Frontend/AllAttendance'
import DownloadButton from '../Report/DownloadButton'
import SelectedMonths from '../Layout/SelectedMonths'
import NoAttendance from './NoAttendance'
import { filteredAttendance } from '@/functions/Attendance/FilteringAttendance'
const AllAttendance: React.FC = () => {
  const user = useSelector((state: RootState) => state.user)
  const Month = useSelector((state: RootState) => state.sort.Month)
  const reportRef = useRef(null)
  const [groupedAttendance, setGroupedAttendance] = useState<{
    [key: string]: AttendanceRecord[]
  }>({})
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (user.Email) {
      setLoading(true)
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
    <>
      <SelectedMonths />
      <div
        ref={reportRef}
        className="overflow-x-auto p-4 text-center w-[80vw] sm:w-auto mx-auto"
      >
        <h1 className="text-xl sm:text-3xl md:text-4xl text-purpleGradientStart mb-4 px-2 text-center">
          ALL ATTENDANCE RECORDS
        </h1>
        {/* Conditionally render content based on attendance data */}
        {Object.keys(filteredAttendance(groupedAttendance, Month)).length >
        0 ? (
          <table className="min-w-full bg-blend-darken border-2 bg-[#bd8bff] border-charcoal-gray shadow-md rounded-lg">
            <thead>
              <tr className="bg-black">
                <th className="border border-purple-800 px-4 py-2 text-white">
                  User Name
                </th>
                <th className="border border-purple-800 px-4 py-2 text-white">
                  Hours Worked
                </th>
                <th className="border border-purple-800 px-4 py-2 text-white">
                  Remaining Hours
                </th>
                <th className="border border-purple-800 px-4 py-2 text-white">
                  Attendance Percentage
                </th>
              </tr>
            </thead>
            <MainTable
              groupedAttendance={filteredAttendance(groupedAttendance, Month)}
            />
          </table>
        ) : (
          <NoAttendance />
        )}
      </div>
      <div className="mt-4 mx-auto flex justify-center items-center">
        <DownloadButton text="Attendance" reportRef={reportRef} />
      </div>
    </>
  )
}
export default AllAttendance
