import { TaskFetch } from '@/utils/TaskformInterface'
import React from 'react'
import TaskBody from './TaskBody'

const TaskCard = ({ allTasks }: { allTasks: TaskFetch[] }) => {
  return (
    <table className="min-w-full border-collapse border border-gray-300 text-center">
      {allTasks.length > 0 ? (
        <>
          <thead>
            <tr className="bg-[#a078ff]">
              <th className="border border-gray-300 p-2 text-white text-xs">
                Task
              </th>
              <th className="border border-gray-300 p-2 text-white text-xs">
                Status
              </th>
              <th className="border border-gray-300 p-2 text-white text-xs">
                Due Date
              </th>
              <th className="border border-gray-300 p-2 text-white text-xs">
                Priority
              </th>
              <th className="border border-gray-300 p-2 text-white text-xs">
                Edit
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {allTasks.map((task) => (
              <TaskBody task={task} key={task.createdAt} />
            ))}
          </tbody>
        </>
      ) : (
        <tbody>
          <tr>
            <td
              colSpan={5}
              className="border border-gray-300 p-2 text-center text-gray-400 text-xs"
            >
              No tasks available.
            </td>
          </tr>
        </tbody>
      )}
    </table>
  )
}

export default TaskCard
