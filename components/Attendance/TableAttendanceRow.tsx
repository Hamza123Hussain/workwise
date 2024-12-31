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
  const totalhours = 176
  return (
    <tbody>
      <th className="border border-purple-800 px-4 py-2 text-[#bd8bff]">
        {userData}
      </th>
      <th className="border border-purple-800 px-4 py-2 text-[#bd8bff]">
        {TotalHourWorked.toFixed(1)}
      </th>
      <th className="border border-purple-800 px-4 py-2 text-[#bd8bff]">
        {(TotalHourWorked > totalhours
          ? 0
          : totalhours - TotalHourWorked
        ).toFixed(2)}
      </th>
      <th className="border border-purple-800 px-4 py-2 text-[#bd8bff]">
        {((TotalHourWorked / 178) * 100).toFixed(2)}%
      </th>
    </tbody>
  )
}

export default AttendanceTableRow
