'use client'
import { getUserTasksForCurrentMonth } from '@/functions/UserTasks/GetTasksForCurrentMonth'
import { RoleTask } from '@/utils/Interfaces/TaskformInterface'
import { RootState } from '@/utils/Redux/Store/Store'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
// Modern pastel-style color palette
const COLORS = ['#60a5fa', '#facc15', '#f87171'] // Blue, Yellow, Red
const UserReport = () => {
  const User = useSelector((state: RootState) => state.user)
  const [count, setCount] = useState<number | null>(null)
  const [monthlyTasks, setMonthlyTasks] = useState<RoleTask[]>([])
  useEffect(() => {
    // Fetch user tasks for the current month
    const getMonthlyStats = async () => {
      const data = await getUserTasksForCurrentMonth(User._id)
      if (data) {
        setCount(data.count)
        setMonthlyTasks(data.data)
      }
    }
    getMonthlyStats()
  }, [User._id])
  // Categorize tasks by priority
  const lowPriorityTasks = monthlyTasks.filter(
    (task) => task.Priority === 'Low'
  )
  const mediumPriorityTasks = monthlyTasks.filter(
    (task) => task.Priority === 'Medium'
  )
  const highPriorityTasks = monthlyTasks.filter(
    (task) => task.Priority === 'High'
  )
  // Prepare data for the chart
  const data = [
    { name: 'Low Priority', value: lowPriorityTasks.length },
    { name: 'Medium Priority', value: mediumPriorityTasks.length },
    { name: 'High Priority', value: highPriorityTasks.length },
  ]
  return (
    <div className="my-10 px-4 sm:px-8">
      {/* Chart container with shadow and rounded styling */}
      <div className=" mx-auto h-80  p-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              isAnimationActive
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              className=" text-[8px] space-x-5 my-3"
              height={36}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
export default UserReport
