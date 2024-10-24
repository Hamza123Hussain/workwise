'use client'
import Loader from '@/components/Loader'
import ReportCard from '@/components/Report/ReportCard'
import { getAttendance } from '@/functions/Frontend/AllAttendance'
import { AllTasks } from '@/functions/Frontend/Alltasks'
import { AttendanceRecord } from '@/utils/AttendanceInterface'
import { RootState } from '@/utils/Redux/Store/Store'
import { MergedUserData } from '@/utils/Report_Interface'
import { TaskFetch } from '@/utils/TaskformInterface'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Report: React.FC = () => {
  const user = useSelector((state: RootState) => state.user)
  const [groupedAttendance, setGroupedAttendance] = useState<{
    [key: string]: AttendanceRecord[]
  }>({})
  const [ALL_TASKS, setALL_TASKS] = useState<{ [key: string]: TaskFetch[] }>({})
  const [loadingAttendance, setLoadingAttendance] = useState<boolean>(true)
  const [loadingTasks, setLoadingTasks] = useState<boolean>(true)
  const [mergedData, setMergedData] = useState<MergedUserData[]>([])

  useEffect(() => {
    if (user.Email) {
      // Fetch attendance
      getAttendance(
        user.Email,
        setLoadingAttendance,
        setGroupedAttendance
      ).finally(() => setLoadingAttendance(false)) // Ensure loading state is updated

      // Fetch tasks
      AllTasks(user.Email, setLoadingTasks, setALL_TASKS).finally(() =>
        setLoadingTasks(false)
      ) // Ensure loading state is updated
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

  // Check if both data fetching is complete
  const isLoading = loadingAttendance || loadingTasks

  return (
    <>
      {isLoading ? (
        <div className=" flex justify-center min-h-screen items-center">
          {' '}
          <Loader />
        </div>
      ) : (
        <ReportCard mergedData={mergedData} />
      )}
    </>
  )
}

export default Report
