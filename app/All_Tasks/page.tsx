'use client'
import MainTable from '@/components/Attendance/MainTable'
import TableHead from '@/components/Layout/TableHead'
import Loader from '@/components/Loader'
import { AllTasks } from '@/functions/Frontend/Alltasks'
import { RootState } from '@/utils/Redux/Store/Store'
import { TaskFetch } from '@/utils/TaskformInterface'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
const AllUserTasks = () => {
  const [loading, setLoading] = useState(false)
  const User = useSelector((state: RootState) => state.user)
  const [ALL_TASKS, setALL_TASKS] = useState<{
    [key: string]: TaskFetch[]
  }>({}) // Fixed type to correctly represent ALL_TASKS
  useEffect(() => {
    AllTasks(User.Email, setLoading, setALL_TASKS)
  }, [])
  if (loading) {
    return (
      <div className=" min-h-screen justify-center items-center flex">
        <Loader />
      </div>
    )
  }
  return (
    <>
      <h1 className="text-xl sm:text-3xl md:text-4xl text-purpleGradientStart mt-20 px-2 text-center">
        ALL TASK DETAILS
      </h1>
      <div className="overflow-x-auto p-4 text-center w-[90vw] sm:w-auto">
        <table className="w-full text-center my-5">
          {' '}
          <TableHead />
          <MainTable groupedAttendance={ALL_TASKS} />{' '}
        </table>
      </div>
    </>
  )
}
export default AllUserTasks
