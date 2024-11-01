'use client'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../utils/Redux/Store/Store'
import { UserFetched } from '@/utils/SignUpInterface'
import { Allusers } from '@/functions/AUTH/Allusers'
import Loader from '@/components/Loader'
import UserSelection from '@/components/Layout/UserSelection'
import AllTasksTable from '@/components/Tasks/AllTaskInfo'
import Usertableview from '@/components/Layout/Usertableview'
const AllTasks: React.FC = () => {
  const [Users, SetUserFetched] = useState<UserFetched[]>([])
  const user = useSelector((state: RootState) => state.user)
  const [loading, setLoading] = useState(true) // Start loading as true
  const [isTableView, setIsTableView] = useState(true) // State to track the current view
  // Function to fetch users
  const Getusers = async () => {
    const Data = await Allusers(user.Email)
    if (Data) {
      SetUserFetched(Data)
      setLoading(false)
    }
  }
  // Fetch users
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
      {/* Buttons to toggle views */}{' '}
      <Usertableview
        setIsTableView={setIsTableView}
        isTableView={isTableView}
      />
      {/* Conditionally render components based on the view */}
      {isTableView ? (
        <AllTasksTable />
      ) : (
        <UserSelection type="Tasks" Users={Users} />
      )}
    </div>
  )
}
export default AllTasks
