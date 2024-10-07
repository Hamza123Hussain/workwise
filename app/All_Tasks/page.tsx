'use client'
import MainTable from '@/components/Attendance/MainTable'
import Loader from '@/components/Loader'
import { groupByUserData } from '@/functions/Attendance/GroupEdAttendance'
import { GetAllTasks } from '@/functions/Task/AllTasks'
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
  const AllTasks = async () => {
    try {
      setLoading(true)
      const Data = await GetAllTasks(User.Email)
      console.log('ALL TASKS', Data)
      if (Data) {
        setLoading(false)
        const groupedData = groupByUserData(Data) as {
          [key: string]: TaskFetch[]
        }
        setALL_TASKS(groupedData)
      }
    } catch (error) {
      console.log(`ERROR IN THE FUNCTION ${error}`)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    AllTasks()
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
      <h1 className=" text-3xl text-purpleGradientStart mt-10 text-center">
        ALL TASK DETAILS
      </h1>
      <div className="overflow-x-auto p-4 text-center w-[90vw] sm:w-auto">
        <table className="w-full text-center my-5">
          <thead>
            <tr className="bg-purple-900">
              <th className="border border-purple-600 text-xs w-56 text-white p-2">
                User Name
              </th>
              <th className="border border-purple-600 text-xs text-white p-2">
                High Priority
              </th>
              <th className="border border-purple-600 text-xs text-white p-2">
                Medium Priority
              </th>
              <th className="border border-purple-600 text-xs text-white p-2">
                Low Priority
              </th>
              <th className="border border-purple-600 text-xs text-white p-2">
                Task Assigned
              </th>
              <th className="border border-purple-600 text-xs text-white p-2">
                Task Completed
              </th>
              <th className="border border-purple-600 text-xs text-white p-2">
                Task Percentage
              </th>
            </tr>
          </thead>
          <MainTable groupedAttendance={ALL_TASKS} />{' '}
        </table>
      </div>
    </>
  )
}

export default AllUserTasks
