import React, { useEffect } from 'react'
import TaskStatus from './TaskStatus'
import TimeBtn from './TimeBtn'
import RecentTasks from '../Tasks/RecentTasks'
import UserDetails from './UserDetails'
import { getAddressFromCoordinates } from '@/functions/Attendance/Checkout/GetExactLocation'
const HomePage = () => {
  useEffect(() => {
    const fetchAddress = async () => {
      const address = await getAddressFromCoordinates(31.4700291, 74.3961214)
      // Call the function to get the address
      console.log('Exact Address:', address) // Log the address to the console
    }

    fetchAddress() // Invoke the fetchAddress function
  }, []) // Empty dependency array to run only on mount

  return (
    <div className="px-4 sm:px-6 w-full min-h-screen">
      {/* Welcome Message */}
      <div className="my-8 flex items-center justify-end">
        <UserDetails />
      </div>
      {/* Main Content with Two Sections */}
      <div className="grid grid-cols-1 w-full gap-6 my-5">
        <div className="flex flex-col sm:flex-row gap-5">
          <TimeBtn />
          <TaskStatus />
        </div>
        <RecentTasks />
      </div>
    </div>
  )
}

export default HomePage
