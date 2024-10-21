import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../utils/Redux/Store/Store'
import { AttendanceRecord } from '../../utils/AttendanceInterface'
import AttendanceTable from './AttendanceTable'
import Loader from '../Loader'
import { getAttendance } from '@/functions/Frontend/GetUserAttendance'
import UserSelection from '../Layout/UserSelection'
import { UserFetched } from '@/utils/SignUpInterface'
import { Allusers } from '@/functions/AUTH/Allusers'
const UserAttendance: React.FC = () => {
  const [Users, SetUserFetched] = useState<UserFetched[]>([])
  const user = useSelector((state: RootState) => state.user)
  const [userAttendance, setAttendance] = useState<AttendanceRecord[]>([])
  const [loading, setLoading] = useState(true) // Start loading as true
  const selectedUser = useSelector((state: RootState) => state.Select)
  // Function to fetch users
  const Getusers = async () => {
    const Data = await Allusers(user.Email)
    if (Data) {
      SetUserFetched(Data)
    }
  }
  // Fetch attendance and users
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
      setLoading(false) // Stop loading after fetching is complete
    }
    fetchAttendance() // Fetch attendance
    Getusers() // Fetch users
    return () => {
      fetchAttendance() // Fetch attendance
    } // Fetch users
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
          {user.Email !== 'octtoppus1@gmail.com' ? (
            <h2 className="text-2xl font-semibold mb-4 text-black text-center">
              All Attendance Records For {user.Name}
            </h2>
          ) : (
            <UserSelection type="Attendance" Users={Users} />
          )}
          <AttendanceTable Attendance={userAttendance} />
        </>
      )}
    </div>
  )
}
export default UserAttendance
