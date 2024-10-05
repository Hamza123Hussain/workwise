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
    <table className=" w-full text-center my-5">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 px-6 py-4">User Name</th>
          <th className="border border-gray-300 px-6 py-4">Attendance</th>
          <th className="border border-gray-300 px-6 py-4">
            Attendance Percentage
          </th>
        </tr>
      </thead>
      <tbody>
        <tr key={userData} className="bg-white">
          <td className="border border-gray-300 w-56">{userData}</td>
          <td className="border border-gray-300 px-6 py-4">
            {attendanceCount}
          </td>
          <td className="border border-gray-300 px-6 py-4">
            {((attendanceCount / 22) * 100).toFixed(2)}%
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default AttendanceTableRow
