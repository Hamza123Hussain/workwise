'use client'
import { AllTasks } from '@/functions/Frontend/Alltasks'
import { RootState } from '@/utils/Redux/Store/Store'
import { TaskFetch } from '@/utils/TaskformInterface'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../Loader'
import TableHead from '../Layout/TableHead'
import MainTable from '../Attendance/MainTable'
import DownloadButton from '../Report/DownloadButton'
const AllTasksTable = () => {
  const reportRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const User = useSelector((state: RootState) => state.user)
  const [ALL_TASKS, setALL_TASKS] = useState<{
    [key: string]: TaskFetch[]
  }>({})
  useEffect(() => {
    AllTasks(User.Email, setLoading, setALL_TASKS)
    return () => {
      AllTasks(User.Email, setLoading, setALL_TASKS)
    }
  }, [User.Email]) // Added User.Email as a dependency

  if (loading) {
    return (
      <div className="min-h-screen justify-center items-center flex">
        <Loader />
      </div>
    )
  }
  return (
    <>
      {' '}
      <div ref={reportRef}>
        <h1 className="text-xl sm:text-3xl md:text-4xl text-purpleGradientStart px-2 text-center mb-5">
          ALL TASK DETAILS
        </h1>
        <div className="overflow-x-auto p-4 text-center w-[90vw] sm:w-auto">
          {!loading ? (
            <table className="min-w-full bg-blend-darken border-2 bg-[#bd8bff] text-white border-charcoal-gray shadow-md rounded-lg">
              <TableHead />
              <MainTable groupedAttendance={ALL_TASKS} />
            </table>
          ) : (
            <div className="min-h-screen flex flex-col justify-center items-center text-center p-4">
              <h2 className="text-2xl text-white font-bold mb-4">
                No Tasks Found
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                It seems there are no tasks available. Please check back later
                or reach out to your administrator.
              </p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition duration-300">
                Go to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>{' '}
      <div className="mt-4 mx-auto flex justify-center items-center">
        <DownloadButton text="Task" reportRef={reportRef} />
      </div>
    </>
  )
}
export default AllTasksTable
