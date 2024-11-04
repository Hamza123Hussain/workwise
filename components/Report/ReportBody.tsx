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
  mergedData: MergedUserData[]
}

// ReportBody.tsx
const ReportBody: React.FC<ReportBodyProps> = ({ mergedData }) => {
  return (
    <tbody className="bg-white text-gray-800">
      {mergedData.map((userData, index) => {
        const totalTaskCompletion = calculateTotalTaskCompletion(userData.tasks)
        const totalHoursWorked = calculateTotalHoursWorked(userData.attendance)
        const attendancePercentage =
          calculateAttendancePercentage(totalHoursWorked)
        const salary: number = parseInt(userData.salary, 10) || 0
        const taskCompletionPercentage =
          userData.tasks.length > 0
            ? totalTaskCompletion / userData.tasks.length
            : 0
        const overallAverage: number = calculateOverallAverage(
          attendancePercentage,
          taskCompletionPercentage
        )
        const overallSalary: number = calculateOverallSalary(
          overallAverage,
          salary
        )

        return (
          <tr
            key={index}
            className="hover:bg-indigo-100 transition-colors duration-200 border-t border-gray-300 "
          >
            <td className="p-4 text-base whitespace-nowrap ">
              {userData.user == 'Arooj'
                ? 'Arooj Yousaf'
                : userData.user == 'Salman'
                ? 'Salman Haider'
                : userData.user}
            </td>
            <td className="p-4 text-base">
              {countPriorityTasks(userData.tasks, 'HIGH')}
            </td>
            <td className="p-4 text-base">
              {countPriorityTasks(userData.tasks, 'MEDIUM')}
            </td>
            <td className="p-4 text-base">
              {countPriorityTasks(userData.tasks, 'LOW')}
            </td>
            <td className="p-4 text-base">{attendancePercentage}%</td>
            <td className="p-4 text-base">
              {taskCompletionPercentage.toFixed(2)}%
            </td>
            <td className="p-4 text-base">{overallAverage.toFixed(2)}%</td>
            <td className="p-4 text-base">
              {Math.floor(overallSalary).toLocaleString()}
            </td>
          </tr>
        )
      })}
    </tbody>
  )
}

export default ReportBody
