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
  return (
    <>
      {TaskFilter === '' ? (
        <div className="flex items-center justify-center h-full text-gray-500 text-center px-4">
          <p className="text-sm font-medium">
            Please select a priority from the chart to view tasks.
          </p>
        </div>
      ) : monthlyTasks.filter((task) => task.Priority === TaskFilter).length ===
        0 ? (
        <div className="flex items-center justify-center h-full text-gray-500 text-center px-4">
          <p className="text-sm font-medium">
            No tasks found for{' '}
            <span className="font-semibold">{TaskFilter}</span> priority.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 h-72 w-full gap-4">
          {monthlyTasks
            .filter((task) => task.Priority === TaskFilter)
            .map((element) => (
              <SmallTaskCard TaskDetail={element} key={element._id} />
            ))}
        </div>
      )}
    </>
  )
}

export default FilteredTasks
