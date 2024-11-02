'use client'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../utils/Redux/Store/Store'
import { UserFetched } from '@/utils/SignUpInterface'
import { Allusers } from '@/functions/AUTH/Allusers'
import Loader from '@/components/Loader'
import UserSelection from '@/components/Layout/UserSelection'
import AllAttendance from '@/components/Attendance/AllAttendance'
import Usertableview from '@/components/Layout/Usertableview'
const UserAttendance: React.FC = () => {
  const [Users, SetUserFetched] = useState<UserFetched[]>([])
  const user = useSelector((state: RootState) => state.user)
  const [loading, setLoading] = useState(true) // Start loading as true
  const [isTableView, setIsTableView] = useState(false) // State to track the current view
  // Function to fetch users
  const Getusers = async () => {
    const Data = await Allusers(user.Email)
    if (Data) {
      SetUserFetched(Data)
      setLoading(false)
    }
  }
  // Fetch attendance and users
  useEffect(() => {
    Getusers() // Fetch users
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
      {/* Conditionally render components based on the view */}
      <Usertableview
        setIsTableView={setIsTableView}
        isTableView={isTableView}
      />
      {isTableView ? (
        <AllAttendance />
      ) : (
        <UserSelection type="Attendance" Users={Users} />
      )}
    </div>
  )
}
export default UserAttendance
