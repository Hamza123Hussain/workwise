import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../utils/Redux/Store/Store'
import { GetAllAttendance } from '../../functions/Attendance/AllAttendance'
import { AttendanceRecord } from '../../utils/AttendanceInterface'
import Loader from '../Loader'
import { groupByUserData } from '@/functions/Attendance/GroupEdAttendance'
import MainTable from './MainTable'

const AllAttendance: React.FC = () => {
  const user = useSelector((state: RootState) => state.user)
  const [groupedAttendance, setGroupedAttendance] = useState<{
    [key: string]: AttendanceRecord[]
  }>({}) // Fixed type to correctly represent groupedAttendance

  const [loading, setLoading] = useState(false)

  const getAttendance = async () => {
    setLoading(true)
    try {
      const data = await GetAllAttendance(user.Email)
      if (data) {
        // Correct type for groupedData as an object with arrays of AttendanceRecord
        const groupedData = groupByUserData(data) as {
          [key: string]: AttendanceRecord[]
        }
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
    <>
      <h1 className=" text-3xl text-purpleGradientStart mt-10 text-center">
        ALL ATTENDANCE RECORDS
      </h1>
      <div className="overflow-x-auto p-4 text-center w-[90vw] sm:w-auto">
        <table className="w-full text-center my-5">
          <thead>
            <tr className="bg-purple-900">
              <th className="border border-purple-600 px-6 py-4 text-white">
                User Name
              </th>
              <th className="border border-purple-600 px-6 py-4 text-white">
                Attendance
              </th>
              <th className="border border-purple-600 px-6 py-4 text-white">
                Attendance Percentage
              </th>
            </tr>
          </thead>
          <MainTable groupedAttendance={groupedAttendance} />
        </table>
      </div>
    </>
  )
}

export default AllAttendance
