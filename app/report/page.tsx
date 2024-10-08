'use client'
import Loader from '@/components/Loader'
import ReportCard from '@/components/Report/ReportCard'
import { GetAllAttendance } from '@/functions/Attendance/AllAttendance'
import { groupByUserData } from '@/functions/Attendance/GroupEdAttendance'
import { GetAllTasks } from '@/functions/Task/AllTasks'
import { AttendanceRecord } from '@/utils/AttendanceInterface'
import { RootState } from '@/utils/Redux/Store/Store'
import { TaskFetch } from '@/utils/TaskformInterface'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

// Define a new interface for merged user data
interface MergedUserData {
  user: string
  attendance: AttendanceRecord[]
  tasks: TaskFetch[]
}

const Report: React.FC = () => {
  const user = useSelector((state: RootState) => state.user)
  const [groupedAttendance, setGroupedAttendance] = useState<{
    [key: string]: AttendanceRecord[]
  }>({})

  const [ALL_TASKS, setALL_TASKS] = useState<{
    [key: string]: TaskFetch[]
  }>({})

  const [loading, setLoading] = useState<boolean>(false)
  const [mergedData, setMergedData] = useState<MergedUserData[]>([])

  const getAttendance = async () => {
    setLoading(true)
    try {
      const data = await GetAllAttendance(user.Email)
      if (data) {
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

  const AllTasks = async () => {
    setLoading(true) // Set loading true before making the request
    try {
      const Data = await GetAllTasks(user.Email)
      if (Data) {
        const groupedData = groupByUserData(Data) as {
          [key: string]: TaskFetch[]
        }
        setALL_TASKS(groupedData)
      }
    } catch (error) {
      console.log(`ERROR IN THE FUNCTION ${error}`)
    } finally {
      setLoading(false) // Ensure loading is set to false after request
    }
  }

  useEffect(() => {
    if (user.Email) {
      getAttendance()
      AllTasks()
    }
  }, [user.Email])

  // Merge groupedAttendance and ALL_TASKS into a single array
  useEffect(() => {
    const merged = Object.keys(groupedAttendance).map((userKey) => {
      return {
        user: userKey,
        attendance: groupedAttendance[userKey] || [],
        tasks: ALL_TASKS[userKey] || [],
      }
    })
    setMergedData(merged)
  }, [groupedAttendance, ALL_TASKS])

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  return <ReportCard mergedData={mergedData} />
}

export default Report
