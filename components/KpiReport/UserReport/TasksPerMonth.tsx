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

  const COLORS = ['#60a5fa', '#facc15', '#f87171']
  const priorities = ['Low', 'Medium', 'High']
  const data = priorities.map((priority) => ({
    name: priority,
    value: monthlyTasks.filter((task) => task.Priority === priority).length,
  }))

  return (
    <div className="flex flex-col sm:flex-row gap-6 bg-white shadow-md p-4 rounded-lg">
      <div className="w-full sm:w-1/2 h-72">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={90}
              dataKey="value"
              isAnimationActive
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index]}
                  onClick={() => SetFilter(entry.name)}
                  cursor="pointer"
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="w-full sm:w-1/2 h-72 overflow-y-auto bg-gray-50 rounded-lg border border-gray-200 p-3">
        <FilteredTasks TaskFilter={TaskFilter} monthlyTasks={monthlyTasks} />
      </div>
    </div>
  )
}

export default TasksPerMonth
