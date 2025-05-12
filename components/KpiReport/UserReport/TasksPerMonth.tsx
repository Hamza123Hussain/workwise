import { RoleTask } from '@/utils/Interfaces/TaskformInterface'
import React, { useState } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import FilteredTasks from './FilteredTasks'
const TasksPerMonth = ({ monthlyTasks }: { monthlyTasks: RoleTask[] }) => {
  const [TaskFilter, SetFilter] = useState('')
  const COLORS = ['#60a5fa', '#facc15', '#f87171'] // Blue, Yellow, Red
  const lowPriorityTasks = monthlyTasks.filter(
    (task) => task.Priority === 'Low'
  )
  const mediumPriorityTasks = monthlyTasks.filter(
    (task) => task.Priority === 'Medium'
  )
  const highPriorityTasks = monthlyTasks.filter(
    (task) => task.Priority === 'High'
  )
  const data = [
    { name: 'Low', value: lowPriorityTasks.length },
    { name: 'Medium', value: mediumPriorityTasks.length },
    { name: 'High', value: highPriorityTasks.length },
  ]
  return (
    <div className=" mx-auto p-6 flex justify-between flex-col sm:flex-row">
      <div className=" w-1/2 h-72">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={90}
              dataKey="value"
              isAnimationActive
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index]}
                  onClick={() => SetFilter(entry.name)} // Set filter on slice click
                  cursor="pointer"
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="w-full md:w-1/2 h-80 p-2 overflow-y-auto bg-gray-50 rounded-lg shadow-inner border border-gray-200">
        {/* 📝 Conditional rendering for empty states */}
        <FilteredTasks TaskFilter={TaskFilter} monthlyTasks={monthlyTasks} />
      </div>
    </div>
  )
}
export default TasksPerMonth
