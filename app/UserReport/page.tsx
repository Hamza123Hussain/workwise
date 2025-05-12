'use client'
import SalaryGaugeChart from '@/components/KpiReport/SalaryPieChart'
import TasksPerMonth from '@/components/KpiReport/UserReport/TasksPerMonth'
import { getUserTasksForCurrentMonth } from '@/functions/UserTasks/GetTasksForCurrentMonth'
import { RoleTask } from '@/utils/Interfaces/TaskformInterface'
import { RootState } from '@/utils/Redux/Store/Store'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
const UserReport = () => {
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
  // Categorize tasks by priority
  return (
    <div className=" flex flex-col">
      <div className="my-10 px-4 sm:px-8">
        <h1 className=" text-center text-xl font-semibold">
          Report Of {User.Name}
        </h1>
        <TasksPerMonth monthlyTasks={monthlyTasks} />
      </div>
      <SalaryGaugeChart Salary={User.Salary} calculatedsalary={11} />
    </div>
  )
}
export default UserReport
