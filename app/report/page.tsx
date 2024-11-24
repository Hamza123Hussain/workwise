'use client'
import Loader from '@/components/Loader'

import ReportCardtwo from '@/components/Report/ReportCard2'
import { Allusers } from '@/functions/AUTH/Allusers'
import { getAttendance } from '@/functions/Frontend/AllAttendance'
import { AllTasks } from '@/functions/Frontend/Alltasks'
import { AttendanceRecord } from '@/utils/AttendanceInterface'
import { RootState } from '@/utils/Redux/Store/Store'
import { UserFetched } from '@/utils/SignUpInterface'
import { TaskFetch } from '@/utils/TaskformInterface'
import React, { useEffect, useState, useMemo } from 'react' // Importing useMemo to optimize performance
import { useSelector } from 'react-redux'

const Report: React.FC = () => {
  const user = useSelector((state: RootState) => state.user) // Get user data from Redux store
  const monthNumber = useSelector((state: RootState) => state.sort.Month) // Get selected month
  const year = new Date().getFullYear() // Get current year
  const [groupedAttendance, setGroupedAttendance] = useState<{
    [key: string]: AttendanceRecord[]
  }>({}) // Attendance data state
  const [ALL_TASKS, setALL_TASKS] = useState<{ [key: string]: TaskFetch[] }>({}) // Task data state
  const [users, setUsers] = useState<UserFetched[]>([]) // Users data state
  const [loadingAttendance, setLoadingAttendance] = useState<boolean>(true) // Loading state for attendance
  const [loadingTasks, setLoadingTasks] = useState<boolean>(true) // Loading state for tasks
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true) // Loading state for users

  useEffect(() => {
    if (user.Email) {
      // Only fetch data if user email exists
      // Fetch attendance data
      getAttendance(
        user.Email,
        setLoadingAttendance,
        setGroupedAttendance
      ).then(() => setLoadingAttendance(false)) // Set loading state to false once attendance is fetched

      // Fetch tasks data
      AllTasks(user.Email, setLoadingTasks, setALL_TASKS).then(
        () => setLoadingTasks(false) // Set loading state to false once tasks are fetched
      )

      // Fetch users data
      const fetchUsers = async () => {
        setLoadingUsers(true) // Set users loading state to true
        const data = await Allusers(user.Email)
        if (data) {
          setUsers(data) // Set users data once fetched
          setLoadingUsers(false) // Set loading state to false once users are fetched
        }
      }
      fetchUsers()
    }
  }, [user.Email]) // Dependency array: effect triggers when `user.Email` changes

  // Calculate the start and end date of the selected month
  const startDate = new Date(year, monthNumber, 1)
  const endDate = new Date(year, monthNumber + 1, 0)

  // Filter attendance data for the selected month using useMemo for optimization
  const filteredAttendance = useMemo(() => {
    return Object.keys(groupedAttendance).reduce((acc, userName) => {
      const attendanceRecords =
        groupedAttendance[userName]?.filter((record) => {
          const recordDate = new Date(record.currentDate)
          return recordDate >= startDate && recordDate <= endDate // Only include records within the selected month
        }) || []
      if (attendanceRecords.length > 0) {
        acc[userName] = attendanceRecords // Only keep users with attendance records
      }
      return acc
    }, {} as { [key: string]: AttendanceRecord[] })
  }, [groupedAttendance, startDate, endDate]) // Dependency array: Recalculate when groupedAttendance, startDate, or endDate change

  // Filter tasks data for the selected month using useMemo for optimization
  const filteredTasks = useMemo(() => {
    return Object.keys(ALL_TASKS).reduce((acc, userName) => {
      const taskRecords =
        ALL_TASKS[userName]?.filter((task) => {
          const taskDate = new Date(task.createdAt)
          return taskDate >= startDate && taskDate <= endDate // Only include tasks within the selected month
        }) || []
      if (taskRecords.length > 0) {
        acc[userName] = taskRecords // Only keep users with tasks
      }
      return acc
    }, {} as { [key: string]: TaskFetch[] })
  }, [ALL_TASKS, startDate, endDate]) // Dependency array: Recalculate when ALL_TASKS, startDate, or endDate change

  // Calculate total tasks count using useMemo for optimization
  const totalTasks = useMemo(() => {
    return Object.values(filteredTasks).reduce(
      (sum, tasks) => sum + tasks.length,
      0
    )
  }, [filteredTasks]) // Recalculate when filteredTasks change

  // Calculate high-priority tasks count using useMemo for optimization
  const highPriorityTasks = useMemo(() => {
    return Object.values(filteredTasks).reduce(
      (sum, tasks) =>
        sum + tasks.filter((task) => task.priority === 'HIGH').length,
      0
    )
  }, [filteredTasks]) // Recalculate when filteredTasks change

  // Calculate low-priority tasks count using useMemo for optimization
  const lowPriorityTasks = useMemo(() => {
    return Object.values(filteredTasks).reduce(
      (sum, tasks) =>
        sum + tasks.filter((task) => task.priority === 'LOW').length,
      0
    )
  }, [filteredTasks]) // Recalculate when filteredTasks change

  // Merge filtered attendance and task data into a single array using useMemo to prevent unnecessary recalculations
  const mergedData = useMemo(() => {
    return users.map((userItem) => {
      return {
        user: userItem.Name,
        salary: userItem.Salary,
        attendance: filteredAttendance[userItem.Name] || [], // Get attendance for the user or empty array
        tasks: filteredTasks[userItem.Name] || [], // Get tasks for the user or empty array
      }
    })
  }, [users, filteredAttendance, filteredTasks]) // Recalculate when users, filteredAttendance, or filteredTasks change

  // Check if data is still being loaded
  const isLoading = loadingAttendance || loadingTasks || loadingUsers

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center min-h-screen items-center">
          <Loader /> {/* Show a loader while data is being fetched */}
        </div>
      ) : (
        <div>
          {/* <ReportCard
            mergedData={mergedData}
            totalTasks={totalTasks}
            highPriorityTasks={highPriorityTasks}
            lowPriorityTasks={lowPriorityTasks} // Pass merged data and task counts to the ReportCard component
          /> */}
          <ReportCardtwo
            mergedData={mergedData}
            totalTasks={totalTasks}
            highPriorityTasks={highPriorityTasks}
            lowPriorityTasks={lowPriorityTasks} // Pass merged data and task counts to the ReportCard component
          />
        </div>
      )}
    </>
  )
}

export default Report
