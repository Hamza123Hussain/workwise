import {
  calculateAttendancePercentage,
  calculateOverallAverage,
  calculateOverallSalary,
  calculateTotalHoursWorked,
  calculateTotalTaskCompletion,
  countPriorityTasks,
} from '@/functions/Frontend/ReportFucntions'
import { MergedUserData } from '@/utils/Report_Interface'
import React from 'react'
interface ReportBodyProps {
  mergedData: MergedUserData[] // Array of user data
}
const ReportBody: React.FC<ReportBodyProps> = ({ mergedData }) => {
  return (
    <tbody className="bg-white text-black">
      {mergedData.map((userData, index) => {
        const totalTaskCompletion = calculateTotalTaskCompletion(userData.tasks)
        const totalHoursWorked = calculateTotalHoursWorked(userData.attendance)
        const attendancePercentage =
          calculateAttendancePercentage(totalHoursWorked)
        const salary = parseInt(userData.salary)
        const taskCompletionPercentage =
          userData.tasks.length > 0
            ? totalTaskCompletion / userData.tasks.length
            : 0
        const overallAverage = calculateOverallAverage(
          attendancePercentage,
          taskCompletionPercentage
        )
        const overallSalary = calculateOverallSalary(overallAverage, salary)
        return (
          <React.Fragment key={index}>
            <tr className="border-t border-purple-500">
              <td className="border border-purple-400 p-4 text-xs whitespace-nowrap">
                {userData.user}
              </td>
              <td className="border border-purple-400 p-1 text-xs">
                {countPriorityTasks(userData.tasks, 'HIGH')}
              </td>
              <td className="border border-purple-400 p-1 text-xs">
                {countPriorityTasks(userData.tasks, 'MEDIUM')}
              </td>
              <td className="border border-purple-400 p-1 text-xs">
                {countPriorityTasks(userData.tasks, 'LOW')}
              </td>{' '}
              <td className="border border-purple-400 p-1 text-xs">
                {attendancePercentage}%
              </td>
              <td className="border border-purple-400 p-1 text-xs">
                {taskCompletionPercentage.toFixed(2)}%
              </td>
              <td className="border border-purple-400 p-1 text-xs">
                {overallAverage.toFixed(2)}%
              </td>
              <td className="border border-purple-400 p-1 text-xs">
                {taskCompletionPercentage > 10 ? overallSalary : 0}
              </td>
            </tr>
          </React.Fragment>
        )
      })}
    </tbody>
  )
}
export default ReportBody
