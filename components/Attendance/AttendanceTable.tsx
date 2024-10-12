import React from 'react'
import AttendanceCard from './AttendanceCard'
import { AttendanceRecord } from '../../utils/AttendanceInterface'
import { countUniqueDates } from '../../functions/Attendance/UniqueDateFunction'
import UserSelection from '../Layout/UserSelection'

const AttendanceTable = ({
  Attendance,
  UserName,
}: {
  Attendance: AttendanceRecord[]
  UserName: string
}) => {
  const totalDaysWorked = countUniqueDates(Attendance)
  const attendancePercentage = ((totalDaysWorked / 22) * 100).toFixed(2)

  return (
    <div className=" mx-auto px-4 py-6 w-[90vw] sm:w-auto my-10">
      <h2 className="text-2xl font-semibold mb-4 text-white text-center">
        All Attendance Records For {UserName}
      </h2>
      <UserSelection />
      <div className="overflow-x-auto flex flex-col">
        <table className="min-w-full bg-blend-darken border-2 border-charcoal-gray shadow-md rounded-lg">
          <thead>
            <tr className="bg-blend-darken">
              <th className="border border-purple-800 px-4 py-2  text-white">
                User Data
              </th>
              <th className="border border-purple-800 px-4 py-2  text-white">
                Entry Time
              </th>
              <th className="border border-purple-800 px-4 py-2  text-white">
                Exit Time
              </th>
              <th className="border border-purple-800 px-4 py-2  text-white">
                Duration
              </th>
              <th className="border border-purple-800 px-4 py-2  text-white">
                Remaining Time
              </th>
              <th className="border border-purple-800 px-4 py-2  text-white">
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
        <div className="flex flex-col  justify-center   gap-4 items-center text-white my-5 space-y-4 ">
          <div className="bg-purpleGradientStart p-4 flex flex-col items-center text-center rounded-lg shadow-md transition-transform duration-200 w-full sm:w-1/2">
            <h1 className="text-lg font-bold">Number Of Days Worked</h1>
            <span className="text-2xl">{totalDaysWorked}</span>
          </div>
          <div className="bg-purpleGradientStart p-4 flex flex-col items-center text-center rounded-lg shadow-md transition-transform duration-200 w-full sm:w-1/2">
            <h1 className="text-lg font-bold">Attendance Percentage</h1>
            <span className="text-2xl">{attendancePercentage}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AttendanceTable
