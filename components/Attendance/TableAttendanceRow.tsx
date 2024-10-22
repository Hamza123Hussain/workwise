import React from 'react'
import { AttendanceRecord } from '@/utils/AttendanceInterface'
const AttendanceTableRow = ({
  userData,
  records,
}: {
  userData: string
  records: AttendanceRecord[]
}) => {
  const TotalHourWorked = records.reduce((acc, ele) => {
    acc += ele.Hours_Worked
    return acc
  }, 0)
  return (
    <tbody>
      <tr key={userData} className="bg-black text-white">
        <td className="border border-purple-600 w-56 px-4 sm:px-6 py-4 text-xs sm:text-base md:text-lg">
          {userData}
        </td>
        <td className="border border-purple-600 px-4 sm:px-6 py-4 text-xs sm:text-base md:text-lg">
          {TotalHourWorked.toFixed(1)}
        </td>
        <td className="border border-purple-600 px-4 sm:px-6 py-4 text-xs sm:text-base md:text-lg">
          {((TotalHourWorked / 176) * 100).toFixed(2)}%
        </td>
      </tr>
    </tbody>
  )
}

export default AttendanceTableRow
