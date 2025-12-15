import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'

import { CheckIn } from '@/functions/Attendance/Checkout/CheckIn'
import { updateAttendance } from '@/functions/Attendance/Checkout/Checkout'

import {
  IncrementHoursWorked,
  SetAttendanceID,
  ToggleCheckin,
} from '@/utils/Redux/Slice/AttendanceSlice/Attendance_Slice'

const ToggleAttendanceButton = () => {
  const dispatch = useDispatch()

  const AttendanceDetails = useSelector(
    (state: RootState) => state.AttedanceSlice
  )
  const UserEmail = useSelector((state: RootState) => state.user.Email)

  // -----------------------------
  // CHECK OUT (update attendance)
  // -----------------------------
  const handleCheckOut = async () => {
    try {
      const response = await updateAttendance({
        email: UserEmail,
        id: AttendanceDetails.attendanceId,
        exitTime: new Date().toISOString(),
        checkInStatus: AttendanceDetails.checkinStatus,
      })

      if (response) {
        dispatch(ToggleCheckin(false))
        dispatch(IncrementHoursWorked(response.attendance.Hours_Worked))
      }
    } catch (error) {
      console.error('Checkout failed:', error)
    }
  }

  // -----------------------------
  // CHECK IN (create attendance)
  // -----------------------------
  const handleCheckIn = async () => {
    try {
      const AttendanceRecorded = await CheckIn(
        UserEmail,
        new Date().toISOString(),
        AttendanceDetails.checkinStatus
      )

      if (AttendanceRecorded) {
        dispatch(ToggleCheckin(true))
        dispatch(SetAttendanceID(AttendanceRecorded.attendance._id))
      }
    } catch (error) {
      console.error('Checkin failed:', error)
    }
  }

  return (
    <div className="flex justify-end my-2">
      {!AttendanceDetails.checkinStatus ? (
        <button
          onClick={handleCheckIn}
          className="bg-[#7544FC] py-1 px-5 text-white rounded-[10px] font-medium transition hover:bg-[#5d2fde]"
        >
          Check In
        </button>
      ) : (
        <button
          onClick={handleCheckOut}
          className="bg-red-500 py-1 px-5 text-white rounded-[10px] font-medium transition hover:bg-red-600"
        >
          Check Out
        </button>
      )}
    </div>
  )
}

export default ToggleAttendanceButton
