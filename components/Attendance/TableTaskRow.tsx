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
    <tbody className="min-w-full">
      <tr key={userData} className="bg-black text-white ">
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
  )
}
export default TaskTableRow
