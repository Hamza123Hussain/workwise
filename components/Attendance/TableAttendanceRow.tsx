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
    <tbody>
      <tr key={userData} className="bg-black text-white">
        <td className="border border-purple-600 w-56 px-4 sm:px-6 py-4 text-xs sm:text-base md:text-lg">
          {userData}
        </td>
        <td className="border border-purple-600 px-4 sm:px-6 py-4 text-xs sm:text-base md:text-lg">
          {attendanceCount}
        </td>
        <td className="border border-purple-600 px-4 sm:px-6 py-4 text-xs sm:text-base md:text-lg">
          {((attendanceCount / 22) * 100).toFixed(2)}%
        </td>
      </tr>
    </tbody>
  )
}

export default AttendanceTableRow
