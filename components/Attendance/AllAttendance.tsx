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
  }>({})
  const [loading, setLoading] = useState(false)
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
  return <MainTable groupedAttendance={groupedAttendance} />
}
export default AllAttendance
