import { countUniqueDates } from '@/functions/Attendance/UniqueDateFunction'
import { AttendanceRecord } from '@/utils/AttendanceInterface'
import { TaskFetch } from '@/utils/TaskformInterface'
import React from 'react'

// Define a type for grouped attendance
type GroupedAttendanceProps = {
  [key: string]: AttendanceRecord[] | TaskFetch[] // Allow both types in the grouped data
}

const MainTable = ({
  groupedAttendance,
}: {
  groupedAttendance: GroupedAttendanceProps
}) => {
  return (
    <div className="overflow-x-auto p-4 text-center w-[90vw] sm:w-auto ">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">User Name</th>
            <th className="border border-gray-300 px-4 py-2">Attendance</th>
            <th className="border border-gray-300 px-4 py-2">
              Attendance Percentage
            </th>
            <th className="border border-gray-300 px-4 py-2">Tasks Assigned</th>
            <th className="border border-gray-300 px-4 py-2">
              Tasks Completed
            </th>
            <th className="border border-gray-300 px-4 py-2">
              Tasks Percentage
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupedAttendance).map(([userData, records]) => {
            if (Array.isArray(records)) {
              // Check if records are AttendanceRecord[]
              if (records.length > 0 && 'UserData' in records[0]) {
                const attendanceCount = countUniqueDates(
                  records as AttendanceRecord[]
                )
                return (
                  <tr key={userData}>
                    <td className="border border-gray-300 px-4 py-2 text-white">
                      {userData}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-white">
                      {attendanceCount}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-white">
                      {((attendanceCount / 22) * 100).toFixed(2)}%
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-white">
                      N/A
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-white">
                      N/A
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-white">
                      N/A
                    </td>
                  </tr>
                )
              }
              // Check if records are TaskFetch[]
              else if (records.length > 0 && 'assignedTo' in records[0]) {
                const tasksAssigned = records.length // Total tasks assigned
                const tasksCompleted = (records as TaskFetch[]).filter(
                  (task) => task.progress === 'DONE'
                ).length // Count of completed tasks
                return (
                  <tr key={userData}>
                    <td className="border border-gray-300 px-4 py-2 text-white">
                      {userData}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-white">
                      N/A
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-white">
                      N/A
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
                        : 0}
                      %
                    </td>
                  </tr>
                )
              }
            }
            return null // Handle unexpected cases
          })}
        </tbody>
      </table>
    </div>
  )
}

export default MainTable
