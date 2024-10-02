import { countUniqueDates } from '@/functions/Attendance/UniqueDateFunction'
import { AttendanceRecord } from '@/utils/AttendanceInterface'
import React from 'react'

const MainTable = ({
  groupedAttendance,
}: {
  groupedAttendance: {
    [key: string]: AttendanceRecord[]
  }
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
          {Object.entries(groupedAttendance).map(([userData, records]) => (
            <tr key={userData}>
              <td className="border border-gray-300 px-4 py-2 text-white">
                {userData}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-white">
                {countUniqueDates(records)}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-white">
                {((countUniqueDates(records) / 22) * 100).toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MainTable
