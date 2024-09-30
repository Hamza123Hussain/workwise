import React from 'react'
import AttendanceCard from './AttendanceCard'
import { AttendanceRecord } from '../../utils/AttendanceInterface'
import { countUniqueDates } from '../../functions/Attendance/UniqueDateFunction'

const AttendanceTable = ({
  Attendance,
}: {
  Attendance: AttendanceRecord[]
}) => {
  const totalDaysWorked = countUniqueDates(Attendance)
  const attendancePercentage = ((totalDaysWorked / 22) * 100).toFixed(2)

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4 text-white">
        All Attendance Records
      </h2>
      <div className="overflow-x-auto flex flex-col">
        <table className="min-w-full bg-blend-darken border-2 border-charcoal-gray shadow-md rounded-lg ">
          <thead>
            <tr className="bg-blend-darken">
              <th className="border border-purple-800 px-4 py-2">User Data</th>
              <th className="border border-purple-800 px-4 py-2">Entry Time</th>
              <th className="border border-purple-800 px-4 py-2">Exit Time</th>
              <th className="border border-purple-800 px-4 py-2">Duration</th>
              <th className="border border-purple-800 px-4 py-2">
                Remaining Time
              </th>
              <th className="border border-purple-800 px-4 py-2">
                Current Date
              </th>
            </tr>
          </thead>
          <tbody>
            {Attendance.map((element) => {
              return <AttendanceCard key={element.id} element={element} />
            })}
          </tbody>
        </table>
        <div className="flex gap-5 items-center text-white my-5 ">
          <div className="bg-purpleGradientStart p-2 rounded-lg shadow-md transition-transform duration-200 hover:scale-105">
            <h1 className="text-lg font-bold">
              Number Of Days Worked:{' '}
              <span className="text-2xl">{totalDaysWorked}</span>
            </h1>
          </div>
          <div className="bg-purpleGradientStart p-2 rounded-lg shadow-md transition-transform duration-200 hover:scale-105">
            <h1 className="text-lg font-bold">
              Attendance Percentage:{' '}
              <span className="text-2xl">{attendancePercentage}%</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AttendanceTable
