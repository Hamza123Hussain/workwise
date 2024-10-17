import { TaskFetch } from '@/utils/TaskformInterface'
import React from 'react'

const TaskOverview = ({ allTasks }: { allTasks: TaskFetch[] }) => {
  const tasksDone = allTasks.filter((task) => task.progress === 'DONE')
  const tasksLeft = allTasks.length - tasksDone.length
  const totalTasks = allTasks.length

  const highPriorityTasks = allTasks.filter((task) => task.priority === 'HIGH')
  const mediumPriorityTasks = allTasks.filter(
    (task) => task.priority === 'MEDIUM'
  )
  const lowPriorityTasks = allTasks.filter((task) => task.priority === 'LOW')

  const overdueTasks = allTasks.filter(
    (task) => new Date(task.dueDate) < new Date() && task.progress !== 'DONE'
  )

  const tasksDonePercentage =
    totalTasks === 0 ? 0 : (tasksDone.length / totalTasks) * 100
  const tasksLeftPercentage =
    totalTasks === 0 ? 0 : (tasksLeft / totalTasks) * 100

  return (
    <>
      <div className="mb-4 flex justify-between">
        <p className="text-lg font-semibold">
          <strong>Assigned:</strong>
          <span className="text-yellow-400"> {totalTasks}</span>
        </p>
        <div className="mb-4">
          <p className="text-lg font-semibold">
            <strong>Overdue:</strong>
            <span className="text-orange-500"> {overdueTasks.length}</span>
          </p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-lg font-semibold">
          <strong>Tasks Done:</strong>
          <span className="text-green-500"> {tasksDone.length}</span>
        </p>
        <div className="w-full bg-gray-600 rounded-full h-4 mt-2">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${tasksDonePercentage}%` }}
          ></div>
        </div>
        <p className="text-sm mt-1">
          {tasksDonePercentage.toFixed(2)}% completed
        </p>
      </div>

      <div className="mb-4">
        <p className="text-lg font-semibold">
          <strong>Tasks Left:</strong>
          <span className="text-red-500"> {tasksLeft}</span>
        </p>
        <div className="w-full bg-gray-600 rounded-full h-4 mt-2">
          <div
            className="bg-red-500 h-4 rounded-full"
            style={{ width: `${tasksLeftPercentage}%` }}
          ></div>
        </div>
        <p className="text-sm mt-1">
          {tasksLeftPercentage.toFixed(2)}% remaining
        </p>
      </div>

      <div className="mb-4">
        <p className="text-lg font-semibold">
          <strong>High Priority Tasks:</strong>
          <span className="text-red-600"> {highPriorityTasks.length}</span>
        </p>
      </div>

      <div className="mb-4">
        <p className="text-lg font-semibold">
          <strong>Medium Priority Tasks:</strong>
          <span className="text-yellow-500"> {mediumPriorityTasks.length}</span>
        </p>
      </div>

      <div className="mb-4">
        <p className="text-lg font-semibold">
          <strong>Low Priority Tasks:</strong>
          <span className="text-green-400"> {lowPriorityTasks.length}</span>
        </p>
      </div>
    </>
  )
}

export default TaskOverview
