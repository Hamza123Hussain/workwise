// TaskCard.tsx
import { TaskFetch } from '@/utils/TaskformInterface'
import React from 'react'
import TaskBody from './TaskBody'

const TaskCard = ({ allTasks }: { allTasks: TaskFetch[] }) => {
  return (
    <table className="min-w-full border-collapse border border-black text-center">
      {allTasks.length > 0 ? (
        <>
          <thead>
            <tr className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700">
              <th className="border border-black p-2  text-white">Task</th>
              <th className="border border-black p-2  text-white">
                Assigned To
              </th>
              <th className="border border-black p-2  text-white">Status</th>
              <th className="border border-black p-2  text-white">
                Description
              </th>
              <th className="border border-black p-2  text-white">Due Date</th>
              <th className="border border-black p-2  text-white">Priority</th>
              <th className="border border-black p-2  text-white">Edit</th>
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
              colSpan={7}
              className="border border-black p-2 text-center text-gray-400"
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
