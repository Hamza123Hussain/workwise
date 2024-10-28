import React from 'react'
import AttendanceCard from './AttendanceCard'
import { AttendanceRecord } from '../../utils/AttendanceInterface'
const AttendanceTable = ({
  Attendance,
}: {
  Attendance: AttendanceRecord[]
}) => {
  // Calculate total hours worked
  const HoursWorked = Attendance.reduce(
    (acc, element) => acc + element.Hours_Worked,
    0
  )
  // Calculate remaining hours and attendance percentage
  const remainingHours = 184 - HoursWorked
  const attendancePercentage = ((HoursWorked / 184) * 100).toFixed(2)
  return (
    <div className="mx-auto px-4 py-6 w-[90vw] sm:w-auto">
      <div className="overflow-x-auto flex flex-col">
        <table className="min-w-full bg-blend-darken border-2 bg-[#bd8bff] border-charcoal-gray shadow-md rounded-lg">
          <thead className="bg-black">
            <tr className="bg-blend-darken">
              <th className="border border-purple-800 px-4 py-2 text-white">
                User Data
              </th>
              <th className="border border-purple-800 px-4 py-2 text-white">
                Entry Time
              </th>
              <th className="border border-purple-800 px-4 py-2 text-white">
                Exit Time
              </th>
              <th className="border border-purple-800 px-4 py-2 text-white">
                Break Time
              </th>
              <th className="border border-purple-800 px-4 py-2 text-white">
                Hour Worked
              </th>
              <th className="border border-purple-800 px-4 py-2 text-white">
                Remaining Time
              </th>
              <th className="border border-purple-800 px-4 py-2 text-white">
                Current Date
              </th>
            </tr>
          </thead>
          <tbody>
            {Attendance.map((element) => (
              <AttendanceCard key={element.id} element={element} />
            ))}
          </tbody>
        </table>
        <div className="flex flex-col justify-center gap-4 items-center text-white my-5 space-y-4">
          <div className="bg-[#b485ff] p-4 flex flex-col items-center text-center rounded-lg shadow-md transition-transform duration-200 w-full sm:w-1/2">
            <h1 className="text-lg font-bold">Number Of Hours Worked</h1>
            <span className="text-2xl">{HoursWorked.toFixed(2)}</span>
          </div>
          <div className="bg-[#b485ff] p-4 flex flex-col items-center text-center rounded-lg shadow-md transition-transform duration-200 w-full sm:w-1/2">
            <h1 className="text-lg font-bold">Remaining Working Hours</h1>
            <span className="text-2xl">{remainingHours.toFixed(2)}</span>
          </div>
          <div className="bg-[#b485ff] p-4 flex flex-col items-center text-center rounded-lg shadow-md transition-transform duration-200 w-full sm:w-1/2">
            <h1 className="text-lg font-bold">Attendance Percentage</h1>
            <span className="text-2xl">{attendancePercentage}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AttendanceTable
