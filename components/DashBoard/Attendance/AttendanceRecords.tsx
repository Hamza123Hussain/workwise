'use client'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAttendance } from '@/functions/Frontend/GetUserAttendance'
import { RootState } from '@/utils/Redux/Store/Store'
import { AttendanceRecord } from '@/utils/Interfaces/AttendanceInterface'
import Loader from '@/components/NewReport/Loader'

const AttendanceRecords: React.FC = () => {
  const HoursWorked = useSelector(
    (state: RootState) => state.AttedanceSlice.HoursWorked,
  )
  const user = useSelector((state: RootState) => state.user)
  const Month = useSelector((state: RootState) => state.sort.Month)

  const [userAttendance, setAttendance] = useState<AttendanceRecord[]>([])
  const [loading, setLoading] = useState(true)

  // Safe date parsing (strict, no `any`)
  const parseToDate = (value: Date | string): Date => {
    return value instanceof Date ? value : new Date(value)
  }

  // Formatters (strict)
  const formatDate = (value: Date | string): string => {
    const d = parseToDate(value)
    return isNaN(d.getTime()) ? '--' : d.toLocaleDateString()
  }

  const formatTime = (value: Date | string): string => {
    const d = parseToDate(value)
    return isNaN(d.getTime())
      ? '--'
      : d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  useEffect(() => {
    const fetchAttendance = async () => {
      if (!user.Email) return

      setLoading(true)

      try {
        const attendance = await getAttendance(
          setLoading,
          user.Email,
          user.Name,
        )

        if (Array.isArray(attendance)) {
          setAttendance(attendance)
        } else {
          setAttendance([])
        }
      } catch (err) {
        console.error('Failed to fetch attendance:', err)
        setAttendance([])
      }

      setLoading(false)
    }

    fetchAttendance()
  }, [user.Email, user.Name, HoursWorked])

  // Filtering strictly typed
  const filteredAttendance = userAttendance
    .filter((record) => {
      const currentDate = parseToDate(record.currentDate)
      return (
        !isNaN(currentDate.getTime()) &&
        currentDate.getMonth() === Month &&
        currentDate.getFullYear() === new Date().getFullYear()
      )
    })
    .reverse()

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="py-[10px] px-[5px] flex flex-col gap-3 overflow-y-auto max-h-[450px]">
      {filteredAttendance.length === 0 ? (
        <div className="text-center text-sm text-[#475467]">
          No attendance records for this month.
        </div>
      ) : (
        filteredAttendance.map((attendance) => (
          <div
            key={attendance.id}
            className="bg-[#FEFEFE] px-4 py-2 rounded-[5px] flex flex-col gap-2"
          >
            <h3 className="text-[14px] font-semibold text-[#101828]">
              {formatDate(attendance.currentDate)}
            </h3>

            <div className="bg-[#F9FAFB] p-3 flex justify-between rounded-[12px] border border-[#EAECF0]">
              <div className="flex flex-col">
                <h3 className="text-[12px] font-medium text-[#475467]">
                  Total Hours
                </h3>
                <h3 className="text-[16px] font-medium text-[#344054]">
                  {attendance.Hours_Worked.toFixed(1)} hrs
                </h3>
              </div>

              <div className="flex flex-col">
                <h3 className="text-[12px] font-medium text-[#475467]">
                  Clock In & Out
                </h3>
                <h3 className="text-[16px] font-medium text-[#344054]">
                  {formatTime(attendance.entry)} — {formatTime(attendance.exit)}
                </h3>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default AttendanceRecords
