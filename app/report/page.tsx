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
  const [ALL_TASKS, setALL_TASKS] = useState<{
    [key: string]: TaskFetch[]
  }>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [mergedData, setMergedData] = useState<MergedUserData[]>([])
  useEffect(() => {
    if (user.Email) {
      getAttendance(user.Email, setLoading, setGroupedAttendance)
      AllTasks(user.Email, setLoading, setALL_TASKS)
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
