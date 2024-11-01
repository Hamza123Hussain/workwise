import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../utils/Redux/Store/Store'
import { AttendanceRecord } from '../../utils/AttendanceInterface'
import Loader from '../Loader'
import MainTable from './MainTable'
import { getAttendance } from '@/functions/Frontend/AllAttendance'
import DownloadButton from '../Report/DownloadButton'
const AllAttendance: React.FC = () => {
  const user = useSelector((state: RootState) => state.user)
  const reportRef = useRef(null)
  const [groupedAttendance, setGroupedAttendance] = useState<{
    [key: string]: AttendanceRecord[]
  }>({})
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (user.Email) {
      getAttendance(user.Email, setLoading, setGroupedAttendance)
    }
    return () => {
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
      <div
        ref={reportRef}
        className="overflow-x-auto p-4 text-center w-[80vw] sm:w-auto mx-auto"
      >
        <h1 className="text-xl sm:text-3xl md:text-4xl text-purpleGradientStart mb-4 px-2 text-center">
          ALL ATTENDANCE RECORDS
        </h1>
        {/* Conditionally render content based on attendance data */}
        {!loading ? (
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
            <MainTable groupedAttendance={groupedAttendance} />
          </table>
        ) : (
          <div className="min-h-screen flex flex-col justify-center items-center text-center p-4">
            <h2 className="text-2xl text-white font-bold mb-4">
              No Attendance Records Found
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              It seems there are no attendance records available. Please check
              back later or reach out to your administrator.
            </p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition duration-300">
              Go to Dashboard
            </button>
          </div>
        )}{' '}
      </div>
      <div className="mt-4 mx-auto flex justify-center items-center">
        <DownloadButton text="Attendance" reportRef={reportRef} />
      </div>
    </>
  )
}
export default AllAttendance
