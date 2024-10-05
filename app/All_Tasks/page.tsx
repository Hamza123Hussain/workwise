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

  return <MainTable groupedAttendance={ALL_TASKS} />
}

export default AllUserTasks
