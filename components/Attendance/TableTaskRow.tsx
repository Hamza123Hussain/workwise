import { TaskFetch } from '@/utils/Interfaces/TaskformInterface'
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
  const TaskCompletion = records.reduce((acc, element) => {
    acc += element.TaskCompletion
    return acc
  }, 0)
  return (
    <tbody className="min-w-full">
      <td className="border border-purple-600 text-[#bd8bff]   text-[12px] sm:text-base md:text-lg  p-4">
        {userData}
      </td>
      <td className="border border-purple-600 text-[#bd8bff]   text-[12px] sm:text-base md:text-lg p-4">
        {HighPirority}
      </td>
      <td className="border border-purple-600 text-[#bd8bff]   text-[12px] sm:text-base md:text-lg p-4">
        {Medium_Pirotiy}
      </td>
      <td className="border border-purple-600 text-[#bd8bff]   text-[12px] sm:text-base md:text-lg p-4">
        {records.length - (Medium_Pirotiy + HighPirority)}
      </td>
      <td className="border border-purple-600 text-[#bd8bff]   text-[12px] sm:text-base md:text-lg p-4">
        {tasksAssigned}
      </td>
      <td className="border border-purple-600 text-[#bd8bff]   text-[12px] sm:text-base md:text-lg p-4">
        {tasksCompleted}
      </td>
      <td className="border border-purple-600 text-[#bd8bff]   text-[12px] sm:text-base md:text-lg p-4">
        {(TaskCompletion / records.length).toFixed(2)}%
      </td>
    </tbody>
  )
}
export default TaskTableRow
