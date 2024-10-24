import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../utils/Redux/Store/Store'
import { AttendanceRecord } from '../../utils/AttendanceInterface'
import AttendanceTable from './AttendanceTable'
import Loader from '../Loader'
import { getAttendance } from '@/functions/Frontend/GetUserAttendance'
const UserAttendance: React.FC = () => {
  const user = useSelector((state: RootState) => state.user)
  const [userAttendance, setAttendance] = useState<AttendanceRecord[]>([])
  const [loading, setLoading] = useState(true) // Start loading as true
  // Fetch attendance and users
  useEffect(() => {
    const fetchAttendance = async () => {
      if (user.Email) {
        const attendance = await getAttendance(
          setLoading,
          user.Email,
          user.Name
        )
        setAttendance(attendance) // Update the attendance state
      }
      setLoading(false) // Stop loading after fetching is complete
    }
    fetchAttendance() // Fetch attendance
    return () => {
      fetchAttendance() // Fetch attendance
    } // Fetch users
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
      {!loading && userAttendance.length === 0 ? (
        <div className="min-h-screen flex flex-col justify-center items-center text-center p-4">
          <h1 className="text-6xl text-black font-bold mb-4">
            No Attendance Records Found
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            It seems you have not recorded any attendance yet. Please check back
            later or reach out to your administrator.
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-black font-semibold py-2 px-4 rounded transition duration-300">
            Go to Dashboard
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-[#c27cff] text-center">
            All Attendance Records For {user.Name}
          </h2>
          <AttendanceTable Attendance={userAttendance} />
        </>
      )}
    </div>
  )
}
export default UserAttendance
