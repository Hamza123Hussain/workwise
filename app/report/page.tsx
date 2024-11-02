'use client'
import SelectedMonths from '@/components/Layout/SelectedMonths'
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
  const monthNumber = useSelector((state: RootState) => state.sort.Month) // Assuming this is a number representing the month (0-11)
  const year = new Date().getFullYear() // Get the current year or use a specific year if you have that info.
  const [groupedAttendance, setGroupedAttendance] = useState<{
    [key: string]: AttendanceRecord[]
  }>({})
  const [ALL_TASKS, setALL_TASKS] = useState<{ [key: string]: TaskFetch[] }>({})
  const [users, setUsers] = useState<UserFetched[]>([])
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

  // Calculate the start and end date of the selected month
  const startDate = new Date(year, monthNumber, 1) // First day of the month
  const endDate = new Date(year, monthNumber + 1, 0) // Last day of the month

  // Filter attendance data for the selected month
  const filteredAttendance = Object.keys(groupedAttendance).reduce(
    (acc, userName) => {
      const attendanceRecords =
        groupedAttendance[userName]?.filter((record) => {
          const recordDate = new Date(record.currentDate)
          return recordDate >= startDate && recordDate <= endDate
        }) || []
      if (attendanceRecords.length > 0) {
        acc[userName] = attendanceRecords
      }
      return acc
    },
    {} as { [key: string]: AttendanceRecord[] }
  )

  // Filter tasks for the selected month
  const filteredTasks = Object.keys(ALL_TASKS).reduce((acc, userName) => {
    const taskRecords =
      ALL_TASKS[userName]?.filter((task) => {
        const taskDate = new Date(task.createdAt)
        return taskDate >= startDate && taskDate <= endDate
      }) || []
    if (taskRecords.length > 0) {
      acc[userName] = taskRecords
    }
    return acc
  }, {} as { [key: string]: TaskFetch[] })

  // Merge filteredAttendance and filteredTasks data into a single array
  useEffect(() => {
    const merged = users.map((userItem) => {
      return {
        user: userItem.Name,
        salary: userItem.Salary,
        attendance: filteredAttendance[userItem.Name] || [],
        tasks: filteredTasks[userItem.Name] || [],
      }
    })
    setMergedData(merged)
  }, [filteredAttendance, filteredTasks, users])

  const isLoading = loadingAttendance || loadingTasks || loadingUsers

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center min-h-screen items-center">
          <Loader />
        </div>
      ) : (
        <div>
          <SelectedMonths />
          <ReportCard mergedData={mergedData} />
        </div>
      )}
    </>
  )
}

export default Report
