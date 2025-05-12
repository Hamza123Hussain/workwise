'use client'
import TasksPerMonth from '@/components/KpiReport/UserReport/TasksPerMonth'
import UserPerformanceSalary from '@/components/KpiReport/UserReport/UserPerformanceSalary'
import { getUserTasksForCurrentMonth } from '@/functions/UserTasks/GetTasksForCurrentMonth'
import { RoleTask } from '@/utils/Interfaces/TaskformInterface'
import { RootState } from '@/utils/Redux/Store/Store'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
const UserUserKpi = () => {
  const User = useSelector((state: RootState) => state.user)
  const [monthlyTasks, setMonthlyTasks] = useState<RoleTask[]>([])
  useEffect(() => {
    // Fetch user tasks for the current month
    const getMonthlyStats = async () => {
      const data = await getUserTasksForCurrentMonth(User._id)
      if (data) {
        setMonthlyTasks(data.data)
      }
    }
    getMonthlyStats()
  }, [User._id])

  return (
    <div className=" flex flex-col my-10 px-4 sm:px-8">
      <div className="my-10 px-4 sm:px-8">
        <h1 className=" text-center text-xl font-semibold">
          Report Of {User.Name}
        </h1>
        <TasksPerMonth monthlyTasks={monthlyTasks} />
        <UserPerformanceSalary User={User} />
      </div>
    </div>
  )
}
export default UserUserKpi
