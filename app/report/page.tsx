import Loader from '@/components/Loader'
import { GetAllAttendance } from '@/functions/Attendance/AllAttendance'
import { groupByUserData } from '@/functions/Attendance/GroupEdAttendance'
import { GetAllTasks } from '@/functions/Task/AllTasks'
import { AttendanceRecord } from '@/utils/AttendanceInterface'
import { RootState } from '@/utils/Redux/Store/Store'
import { TaskFetch } from '@/utils/TaskformInterface'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
const Report = () => {
  const user = useSelector((state: RootState) => state.user)
  const [groupedAttendance, setGroupedAttendance] = useState<{
    [key: string]: AttendanceRecord[]
  }>({}) // Fixed type to correctly represent groupedAttendance

  const [loading, setLoading] = useState(false)

  const getAttendance = async () => {
    setLoading(true)
    try {
      const data = await GetAllAttendance(user.Email)
      if (data) {
        // Correct type for groupedData as an object with arrays of AttendanceRecord
        const groupedData = groupByUserData(data) as {
          [key: string]: AttendanceRecord[]
        }
        setGroupedAttendance(groupedData)
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user.Email) {
      getAttendance()
    }
  }, [user.Email])

  const [ALL_TASKS, setALL_TASKS] = useState<{
    [key: string]: TaskFetch[]
  }>({}) // Fixed type to correctly represent ALL_TASKS
  const AllTasks = async () => {
    try {
      setLoading(true)
      const Data = await GetAllTasks(user.Email)
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
  if (AllTasks.length > 1) {
    console.log('ALL DATA ', ALL_TASKS, groupedAttendance)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  return <div></div>
}

export default Report
