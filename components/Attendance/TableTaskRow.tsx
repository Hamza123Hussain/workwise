import { TaskFetch } from '@/utils/TaskformInterface'
import React from 'react'
const TaskTableRow = ({
  userData,
  records,
}: {
  userData: string
  records: TaskFetch[]
}) => {
  const tasksAssigned = records.length
  const tasksCompleted = records.filter(
    (task) => task.progress === 'DONE'
  ).length
  return (
    <table className=" w-full text-center my-5">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 px-4 py-2">User Name</th>
          <th className="border border-gray-300 px-4 py-2">Task Assigned</th>
          <th className="border border-gray-300 px-4 py-2">Task Completed</th>
          <th className="border border-gray-300 px-4 py-2">Task Percentage</th>
        </tr>
      </thead>
      <tbody className="min-w-full border border-gray-300">
        <tr key={userData}>
          <td className="border border-gray-300 px-4 py-2 w-56 text-white">
            {userData}
          </td>
          <td className="border border-gray-300 px-4 py-2 text-white">
            {tasksAssigned}
          </td>
          <td className="border border-gray-300 px-4 py-2 text-white">
            {tasksCompleted}
          </td>
          <td className="border border-gray-300 px-4 py-2 text-white">
            {tasksAssigned > 0
              ? ((tasksCompleted / tasksAssigned) * 100).toFixed(2)
              : '0'}
            %
          </td>
        </tr>{' '}
      </tbody>
    </table>
  )
}
export default TaskTableRow
