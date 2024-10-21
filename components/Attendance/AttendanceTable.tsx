import React from 'react'
import AttendanceCard from './AttendanceCard'
import { AttendanceRecord } from '../../utils/AttendanceInterface'
const AttendanceTable = ({
  Attendance,
}: {
  Attendance: AttendanceRecord[]
}) => {
  const HoursWorked = Attendance.reduce((acc, element) => {
    // Sum the Hours_Worked values, which are assumed to be floating-point numbers
    return acc + element.Hours_Worked
  }, 0)

  // Calculate the attendance percentage, rounding to two decimal places
  const attendancePercentage = ((HoursWorked / 176) * 100).toFixed(2)

  return (
    <div className=" mx-auto px-4 py-6 w-[90vw] sm:w-auto my-10">
      <div className="overflow-x-auto flex flex-col">
        <table className="min-w-full bg-blend-darken border-2 border-charcoal-gray shadow-md rounded-lg">
          <thead>
            <tr className="bg-blend-darken">
              <th className="border border-purple-800 px-4 py-2  text-black">
                User Data
              </th>
              <th className="border border-purple-800 px-4 py-2  text-black">
                Entry Time
              </th>
              <th className="border border-purple-800 px-4 py-2  text-black">
                Exit Time
              </th>
              <th className="border border-purple-800 px-4 py-2  text-black">
                Break Time
              </th>
              <th className="border border-purple-800 px-4 py-2  text-black">
                Hour Worked
              </th>
              <th className="border border-purple-800 px-4 py-2  text-black">
                Remaining Time
              </th>
              <th className="border border-purple-800 px-4 py-2  text-black">
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
        <div className="flex flex-col  justify-center   gap-4 items-center text-black my-5 space-y-4 ">
          <div className="bg-purpleGradientStart p-4 flex flex-col items-center text-center rounded-lg shadow-md transition-transform duration-200 w-full sm:w-1/2">
            <h1 className="text-lg font-bold">Number Of Hours Worked</h1>
            <span className="text-2xl">{HoursWorked.toFixed(2)}</span>
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
