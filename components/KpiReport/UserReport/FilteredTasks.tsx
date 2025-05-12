import React from 'react'
import SmallTaskCard from './SmallTaskCard'
import { RoleTask } from '@/utils/Interfaces/TaskformInterface'

const FilteredTasks = ({
  TaskFilter,
  monthlyTasks,
}: {
  TaskFilter: string
  monthlyTasks: RoleTask[]
}) => {
  const filtered = monthlyTasks.filter((task) => task.Priority === TaskFilter)

  if (!TaskFilter) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-center px-4">
        <p className="text-sm">
          Please select a priority from the chart to view tasks.
        </p>
      </div>
    )
  }

  if (filtered.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-center px-4">
        <p className="text-sm">
          No tasks found for <span className="font-semibold">{TaskFilter}</span>{' '}
          priority.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {filtered.map((task) => (
        <SmallTaskCard TaskDetail={task} key={task._id} />
      ))}
    </div>
  )
}

export default FilteredTasks
