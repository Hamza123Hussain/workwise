import { getUserSalary } from '@/functions/AUTH/GetSalary'
import { AttendanceRecord } from '@/utils/AttendanceInterface'
import { TaskFetch } from '@/utils/TaskformInterface'
import React, { useEffect, useState } from 'react'

// Define interfaces for user data
interface MergedUserData {
  user: string
  attendance: AttendanceRecord[]
  tasks: TaskFetch[]
}

interface ReportBodyProps {
  mergedData: MergedUserData[] // Array of user data
}

const ReportBody: React.FC<ReportBodyProps> = ({ mergedData }) => {
  const [salaries, setSalaries] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    const fetchSalaries = async () => {
      const salaryData: { [key: string]: number } = {}
      for (const userData of mergedData) {
        const salary = await getUserSalary(userData.user)
        salaryData[userData.user] = salary
      }
      setSalaries(salaryData)
    }

    fetchSalaries()
  }, [mergedData])

  return (
    <tbody className="bg-gray-800 text-purple-200">
      {mergedData.map((userData, index) => {
        // Calculate high priority tasks using reduce
        const highPriorityCount = userData.tasks.reduce((acc, element) => {
          return element.priority === 'HIGH' ? acc + 1 : acc
        }, 0)

        // Calculate medium and low priority tasks similarly
        const mediumPriorityCount = userData.tasks.reduce((acc, element) => {
          return element.priority === 'MEDIUM' ? acc + 1 : acc
        }, 0)

        const lowPriorityCount = userData.tasks.reduce((acc, element) => {
          return element.priority === 'LOW' ? acc + 1 : acc
        }, 0)

        // Calculate total task completion
        const totalTaskCompletion = userData.tasks.reduce((acc, element) => {
          return acc + element.TaskCompletion // Assuming TaskCompletion is a number
        }, 0)

        // Calculate total hours worked
        const totalHoursWorked = userData.attendance.reduce((acc, element) => {
          return acc + element.Hours_Worked // Assuming Hours_Worked is a float
        }, 0)

        // Calculate attendance percentage
        const attendancePercentage = ((totalHoursWorked / 176) * 100).toFixed(2)

        // Get the salary for the current user
        const salary = salaries[userData.user] || 0

        // Calculate task completion percentage
        const taskCompletionPercentage =
          userData.tasks.length > 0
            ? totalTaskCompletion / userData.tasks.length
            : 0

        // Calculate overall average
        const overallAverage =
          userData.tasks.length > 0
            ? (parseFloat(attendancePercentage) + taskCompletionPercentage) / 2
            : 0

        // Calculate overall salary based on averages
        const overallSalary =
          userData.tasks.length > 0
            ? ((overallAverage / 100) * salary).toFixed(0)
            : 0

        return (
          <React.Fragment key={index}>
            {/* Summary Row */}
            <tr className="border-t border-purple-500">
              <td className="border border-purple-400 p-2">{userData.user}</td>
              <td className="border border-purple-400 p-2">
                {attendancePercentage}%
              </td>
              <td className="border border-purple-400 p-2">
                {highPriorityCount}
              </td>
              <td className="border border-purple-400 p-2">
                {mediumPriorityCount}
              </td>
              <td className="border border-purple-400 p-2">
                {lowPriorityCount}
              </td>
              <td className="border border-purple-400 p-2">
                {taskCompletionPercentage.toFixed(2)}%
              </td>
              <td className="border border-purple-400 p-2">
                {overallAverage.toFixed(2)}%
              </td>
              <td className="border border-purple-400 p-2">{overallSalary}</td>
            </tr>
          </React.Fragment>
        )
      })}
    </tbody>
  )
}

export default ReportBody
