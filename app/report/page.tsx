'use client'
import Loader from '@/components/Loader'
import ReportCard from '@/components/Report/ReportCard'
import { Allusers } from '@/functions/AUTH/Allusers'
import { getAttendance } from '@/functions/Frontend/AllAttendance'
import { AllTasks } from '@/functions/Frontend/Alltasks'
import { AttendanceRecord } from '@/utils/AttendanceInterface'
import { RootState } from '@/utils/Redux/Store/Store'
import { MergedUserData } from '@/utils/Report_Interface'
import { UserFetched } from '@/utils/SignUpInterface'
import { TaskFetch } from '@/utils/TaskformInterface'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
const Report: React.FC = () => {
  const user = useSelector((state: RootState) => state.user)
  const [groupedAttendance, setGroupedAttendance] = useState<{
    [key: string]: AttendanceRecord[]
  }>({})
  const [ALL_TASKS, setALL_TASKS] = useState<{ [key: string]: TaskFetch[] }>({})
  const [users, setUsers] = useState<UserFetched[]>([]) // Adjust type as needed
  const [loadingAttendance, setLoadingAttendance] = useState<boolean>(true)
  const [loadingTasks, setLoadingTasks] = useState<boolean>(true)
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true)
  const [mergedData, setMergedData] = useState<MergedUserData[]>([])
  useEffect(() => {
    if (user.Email) {
      // Fetch attendance
      getAttendance(
        user.Email,
        setLoadingAttendance,
        setGroupedAttendance
      ).then(() => setLoadingAttendance(false))
      // Fetch tasks
      AllTasks(user.Email, setLoadingTasks, setALL_TASKS).then(() =>
        setLoadingTasks(false)
      )
      // Fetch users
      const fetchUsers = async () => {
        setLoadingUsers(true)
        const data = await Allusers(user.Email)
        if (data) {
          setUsers(data)
          setLoadingUsers(false)
        }
      }
      fetchUsers()
    }
  }, [user.Email])
  // Merge groupedAttendance, ALL_TASKS, and users data into a single array
  useEffect(() => {
    const merged = users.map((userItem) => {
      return {
        user: userItem.Name,
        salary: userItem.Salary,
        attendance: groupedAttendance[userItem.Name] || [],
        tasks: ALL_TASKS[userItem.Name] || [],
      }
    })
    setMergedData(merged)
  }, [groupedAttendance, ALL_TASKS, users])
  const isLoading = loadingAttendance || loadingTasks || loadingUsers
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center min-h-screen items-center">
          <Loader />
        </div>
      ) : (
        <ReportCard mergedData={mergedData} />
      )}
    </>
  )
}
export default Report
