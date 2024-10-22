'use client'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../utils/Redux/Store/Store'
import { UserFetched } from '@/utils/SignUpInterface'
import { Allusers } from '@/functions/AUTH/Allusers'
import Loader from '@/components/Loader'
import UserSelection from '@/components/Layout/UserSelection'
const UserAttendance: React.FC = () => {
  const [Users, SetUserFetched] = useState<UserFetched[]>([])
  const user = useSelector((state: RootState) => state.user)
  const [loading, setLoading] = useState(true) // Start loading as true
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
    return () => {
      Getusers() // Fetch attendance
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
      <>
        <UserSelection type="Attendance" Users={Users} />
      </>
    </div>
  )
}
export default UserAttendance
