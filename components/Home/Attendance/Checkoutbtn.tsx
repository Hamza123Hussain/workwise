import { updateAttendance } from '@/functions/Attendance/Checkout/Checkout'
import {
  IncrementHoursWorked,
  ToggleCheckin,
} from '@/utils/Redux/Slice/AttendanceSlice/Attendance_Slice'
import { RootState } from '@/utils/Redux/Store/Store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Checkoutbtn = () => {
  const Dispatch = useDispatch()
  const AttendanceDetails = useSelector(
    (state: RootState) => state.AttedanceSlice
  )
  const UserEmail = useSelector((state: RootState) => state.user.Email)
  // Example Usage:
  const handleUpdateAttendance = async () => {
    try {
      const response = await updateAttendance({
        email: UserEmail,
        id: AttendanceDetails.attendanceId,
        exitTime: new Date().toISOString(),
        checkInStatus: AttendanceDetails.checkinStatus, // Set based on UI logic
      })
      if (response) {
        Dispatch(ToggleCheckin(!AttendanceDetails.checkinStatus))
        Dispatch(IncrementHoursWorked(response.attendance.Hours_Worked))
      }
    } catch (error) {
      console.error('Update failed:', error)
    }
  }
  return (
    <button
      onClick={handleUpdateAttendance}
      className=" bg-red-600 w-full text-white p-4 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-red-700"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
      <span>Check Out</span>
    </button>
  )
}

export default Checkoutbtn
