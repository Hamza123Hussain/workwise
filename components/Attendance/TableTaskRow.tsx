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
  const HighPirority = records.filter((task) => task.priority === 'HIGH').length
  const Medium_Pirotiy = records.filter(
    (task) => task.priority === 'MEDIUM'
  ).length
  return (
    <table className="w-full text-center my-5">
      <thead>
        <tr className="bg-purple-900">
          <th className="border border-purple-600 text-xs w-56 text-white p-2">
            User Name
          </th>
          <th className="border border-purple-600 text-xs text-white p-2">
            High Priority
          </th>
          <th className="border border-purple-600 text-xs text-white p-2">
            Medium Priority
          </th>
          <th className="border border-purple-600 text-xs text-white p-2">
            Low Priority
          </th>
          <th className="border border-purple-600 text-xs text-white p-2">
            Task Assigned
          </th>
          <th className="border border-purple-600 text-xs text-white p-2">
            Task Completed
          </th>
          <th className="border border-purple-600 text-xs text-white p-2">
            Task Percentage
          </th>
        </tr>
      </thead>
      <tbody className="min-w-full">
        <tr
          key={userData}
          className="bg-black text-white hover:bg-purple-700 transition duration-300"
        >
          <td className="border border-purple-600 w-56 p-4">{userData}</td>
          <td className="border border-purple-600 p-4">{HighPirority}</td>
          <td className="border border-purple-600 p-4">{Medium_Pirotiy}</td>
          <td className="border border-purple-600 p-4">
            {records.length - (Medium_Pirotiy + HighPirority)}
          </td>
          <td className="border border-purple-600 p-4">{tasksAssigned}</td>
          <td className="border border-purple-600 p-4">{tasksCompleted}</td>
          <td className="border border-purple-600 p-4">
            {tasksAssigned > 0
              ? ((tasksCompleted / tasksAssigned) * 100).toFixed(2)
              : '0'}
            %
          </td>
        </tr>
      </tbody>
    </table>
  )
}
export default TaskTableRow
