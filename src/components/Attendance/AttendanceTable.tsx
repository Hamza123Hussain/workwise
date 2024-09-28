import React from 'react'
import AttendanceCard from './AttendanceCard'
import { AttendanceRecord } from '../../utils/AttendanceInterface'

const AttendanceTable = ({
  Attendance,
}: {
  Attendance: AttendanceRecord[]
}) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">All Attendance Records</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">User Data</th>
              <th className="border border-gray-300 px-4 py-2">Entry Time</th>
              <th className="border border-gray-300 px-4 py-2">Exit Time</th>
              <th className="border border-gray-300 px-4 py-2">Duration</th>
              <th className="border border-gray-300 px-4 py-2">
                Remaining Time
              </th>
              <th className="border border-gray-300 px-4 py-2">Absent</th>
              <th className="border border-gray-300 px-4 py-2">Current Date</th>
            </tr>
          </thead>
          <tbody>
            {Attendance.map((element) => {
              return <AttendanceCard element={element} />
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AttendanceTable
