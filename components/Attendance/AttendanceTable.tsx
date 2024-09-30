import React from 'react'
import AttendanceCard from './AttendanceCard'
import { AttendanceRecord } from '../../utils/AttendanceInterface'
import { countUniqueDates } from '../../functions/Attendance/UniqueDateFunction'

const AttendanceTable = ({
  Attendance,
}: {
  Attendance: AttendanceRecord[]
}) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4 text-black">
        All Attendance Records
      </h2>
      <div className="overflow-x-auto flex flex-col ">
        <table className="min-w-full bg-black border border-purple-800 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-black">
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
        <div className=" flex flex-col justify-end items-end text-black my-5">
          <h1>Number Of Days Worked :{countUniqueDates(Attendance)}</h1>
          <h1>
            Attendance Percentage :{' '}
            {(countUniqueDates(Attendance) / 22).toFixed(2)}%
          </h1>
        </div>
      </div>
    </div>
  )
}

export default AttendanceTable
