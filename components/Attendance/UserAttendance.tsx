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
  const [loading, setLoading] = useState(false)
  const selectedUser = useSelector((state: RootState) => state.Select)
  useEffect(() => {
    const fetchAttendance = async () => {
      if (user.Email) {
        const attendance = await getAttendance(
          setLoading,
          user.Email,
          user.Email === 'octtoppus1@gmail.com' ? selectedUser : user.Name
        )
        setAttendance(attendance) // Update the attendance state
      }
    }
    fetchAttendance() // Fetch attendance when user.Email or selectedUser changes
  }, [user, selectedUser])
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    )
  }
  return (
    <div className="p-6">
      {userAttendance.length > 0 ? (
        <AttendanceTable Attendance={userAttendance} UserName={user.Name} />
      ) : (
        <div className="min-h-screen flex flex-col justify-center items-center text-center p-4">
          <h1 className="text-6xl text-white font-bold mb-4">
            No Attendance Records Found
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            It seems you have not recorded any attendance yet. Please check back
            later or reach out to your administrator.
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition duration-300">
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  )
}
export default UserAttendance
