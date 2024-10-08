import { AttendanceRecord } from '@/utils/AttendanceInterface'
import { TaskFetch } from '@/utils/TaskformInterface'
import React from 'react'

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
  return (
    <tbody className="bg-gray-800 text-purple-200">
      {' '}
      {/* Background dark gray with purple text */}
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
        const TaskCompletion = userData.tasks.reduce((acc, element) => {
          return acc + element.TaskCompletion // Assuming TaskCompletion is a number
        }, 0)

        // Calculate attendance percentage
        const attendancePercentage = (
          (userData.attendance.length / 22) *
          100
        ).toFixed(2)

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
                {/* Calculate Task Completion Percentage */}
                {userData.tasks.length > 0
                  ? (TaskCompletion / userData.tasks.length).toFixed(2)
                  : 0}
                %
              </td>{' '}
              <td className="border border-purple-400 p-2">
                {/* Calculate Overall Average */}
                {userData.tasks.length > 0
                  ? (
                      (parseFloat(attendancePercentage) +
                        parseFloat(
                          (TaskCompletion / userData.tasks.length).toFixed(2)
                        )) /
                      2
                    ).toFixed(2)
                  : 0}
                %
              </td>{' '}
              <td className="border border-purple-400 p-2">
                {/* Calculate Overall Average */}
                {userData.tasks.length > 0
                  ? (
                      ((parseFloat(attendancePercentage) +
                        parseFloat(
                          (TaskCompletion / userData.tasks.length).toFixed(2)
                        )) /
                        2 /
                        100) *
                      45000
                    ).toFixed(0)
                  : 0}
              </td>
            </tr>

            {/* You can add a detailed data row here if needed */}
          </React.Fragment>
        )
      })}
    </tbody>
  )
}

export default ReportBody
