'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { AllTasks } from '@/functions/Frontend/Alltasks'
import { RootState } from '@/utils/Redux/Store/Store'
import { TaskFetch } from '@/utils/Interfaces/TaskformInterface'
import Loader from '../Loader'
import MainTable from '../Attendance/MainTable' // Replace with your tasks table component
import DownloadButton from '../Report/DownloadButton'
import SelectedMonths from '../Layout/SelectedMonths'

// Utility function to filter tasks by selected month
const filterTasksByMonth = (
  groupedTasks: { [key: string]: TaskFetch[] },
  selectedMonth: number
) => {
  return Object.keys(groupedTasks).reduce((acc, key) => {
    const tasksForMonth = groupedTasks[key].filter(
      (task) => new Date(task.createdAt).getMonth() === selectedMonth
    )
    if (tasksForMonth.length > 0) {
      acc[key] = tasksForMonth
    }
    return acc
  }, {} as { [key: string]: TaskFetch[] })
}

const AllTasksTable: React.FC = () => {
  const reportRef = useRef(null)
  const Month = useSelector((state: RootState) => state.sort.Month)
  const User = useSelector((state: RootState) => state.user)

  const [loading, setLoading] = useState(false)
  const [ALL_TASKS, setALL_TASKS] = useState<{
    [key: string]: TaskFetch[]
  }>({})

  // Fetch tasks for the user
  useEffect(() => {
    if (User.Email) {
      setLoading(true)
      AllTasks(User.Email, setLoading, setALL_TASKS)
    }
  }, [User.Email])

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  // Filter tasks by the selected month
  const filteredTasks = filterTasksByMonth(ALL_TASKS, Month)

  return (
    <>
      <SelectedMonths />
      <div
        ref={reportRef}
        className="overflow-x-auto p-4 text-center w-[80vw] sm:w-auto mx-auto"
      >
        <h1 className="text-xl sm:text-3xl md:text-4xl text-purpleGradientStart mb-4 px-2 text-center">
          TASKS COMPLETED PER MONTH
        </h1>
        {/* Conditionally render content based on filtered tasks */}
        {Object.keys(filteredTasks).length > 0 ? (
          <table className="min-w-full bg-blend-darken border-2 bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-[#bd8bff]">
                <th className="border border-purple-800 px-4 py-2 text-white">
                  Employee Name
                </th>
                <th className="border border-purple-800 px-4 py-2 text-white">
                  High Priority
                </th>
                <th className="border border-purple-800 px-4 py-2 text-white">
                  Medium Priority
                </th>
                <th className="border border-purple-800 px-4 py-2 text-white">
                  Low Priority
                </th>
                <th className="border border-purple-800 px-4 py-2 text-white">
                  Task Assigned
                </th>
                <th className="border border-purple-800 px-4 py-2 text-white">
                  Task Completed
                </th>
                <th className="border border-purple-800 px-4 py-2 text-white">
                  Completion Percentage
                </th>
              </tr>
            </thead>
            <MainTable groupedAttendance={filteredTasks} />
          </table>
        ) : (
          <div className="text-center mt-4 text-lg font-medium">
            No tasks found for the selected month.
          </div>
        )}
      </div>
      <div className="mt-4 mx-auto flex justify-center items-center">
        <DownloadButton text="Tasks" reportRef={reportRef} />
      </div>
    </>
  )
}

export default AllTasksTable
