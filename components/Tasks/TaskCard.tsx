import { TaskFetch } from '@/utils/TaskformInterface'
import React from 'react'
import TaskBody from './TaskBody'
const TaskCard = ({ allTasks }: { allTasks: TaskFetch[] }) => {
  return (
    <table className="min-w-full border-collapse border border-purple-500">
      {allTasks.length > 0 ? (
        <>
          <thead>
            <tr className="bg-purple-600">
              <th className="border border-purple-500 p-2 text-left text-white">
                Task
              </th>
              <th className="border border-purple-500 p-2 text-left text-white">
                Assigned To
              </th>
              <th className="border border-purple-500 p-2 text-left text-white">
                Status
              </th>
              <th className="border border-purple-500 p-2 text-left text-white">
                Description
              </th>
              <th className="border border-purple-500 p-2 text-left text-white">
                Due Date
              </th>
              <th className="border border-purple-500 p-2 text-left text-white">
                Priority
              </th>
              <th className="border border-purple-500 p-2 text-left text-white">
                Edit
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {allTasks.map((task) => (
              <TaskBody task={task} key={task.createdAt} />
            ))}
          </tbody>
        </>
      ) : (
        <tbody>
          <tr>
            <td
              colSpan={7} // Adjusted colSpan to cover all columns including 'Edit'
              className="border border-purple-500 p-2 text-center text-gray-400"
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
