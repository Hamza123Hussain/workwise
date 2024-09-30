import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../utils/Redux/Store/Store'
import { GetAllAttendance } from '../../functions/Attendance/AllAttendance'
import { AttendanceRecord } from '../../utils/AttendanceInterface'

import Loader from '../Loader'

const AllAttendance: React.FC = () => {
  const user = useSelector((state: RootState) => state.user)
  const [groupedAttendance, setGroupedAttendance] = useState<{
    [key: string]: AttendanceRecord[]
  }>({})
  const [loading, setLoading] = useState(false)

  const groupByUserData = (attendance: AttendanceRecord[]) => {
    return attendance.reduce((acc, record) => {
      const userData = record.UserData
      if (!acc[userData]) {
        acc[userData] = []
      }
      acc[userData].push(record)
      return acc
    }, {} as { [key: string]: AttendanceRecord[] })
  }

  const getAttendance = async () => {
    setLoading(true)
    try {
      const data = await GetAllAttendance(user.Email)
      if (data) {
        const groupedData = groupByUserData(data)
        setGroupedAttendance(groupedData)
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user.Email) {
      getAttendance()
    }
  }, [user.Email])

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="overflow-x-auto p-4 text-center ">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">User Name</th>
            <th className="border border-gray-300 px-4 py-2">Attendance</th>
            <th className="border border-gray-300 px-4 py-2">
              Attendance Percentage
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupedAttendance).map(([userData, records]) => (
            <tr key={userData}>
              <td className="border border-gray-300 px-4 py-2 text-white">
                {userData}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-white">
                {records.length}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-white">
                {(records.length / 22).toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AllAttendance
