import React from 'react'
import { AttendanceRecord } from '@/utils/AttendanceInterface'
import { countUniqueDates } from '@/functions/Attendance/UniqueDateFunction'

const AttendanceTableRow = ({
  userData,
  records,
}: {
  userData: string
  records: AttendanceRecord[]
}) => {
  const attendanceCount = countUniqueDates(records)

  return (
    <table className="w-full text-center my-5">
      <thead>
        <tr className="bg-purple-900">
          <th className="border border-purple-600 px-6 py-4 text-white">
            User Name
          </th>
          <th className="border border-purple-600 px-6 py-4 text-white">
            Attendance
          </th>
          <th className="border border-purple-600 px-6 py-4 text-white">
            Attendance Percentage
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          key={userData}
          className="bg-black text-white hover:bg-purple-700 transition duration-300"
        >
          <td className="border border-purple-600 w-56 px-6 py-4">
            {userData}
          </td>
          <td className="border border-purple-600 px-6 py-4">
            {attendanceCount}
          </td>
          <td className="border border-purple-600 px-6 py-4">
            {((attendanceCount / 22) * 100).toFixed(2)}%
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default AttendanceTableRow
