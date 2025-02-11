import { CheckIn } from '@/functions/Attendance/Checkout/CheckIn'
import {
  SetAttendanceID,
  ToggleCheckin,
} from '@/utils/Redux/Slice/AttendanceSlice/Attendance_Slice'
import { RootState } from '@/utils/Redux/Store/Store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
const CheckinBtn = () => {
  const Dispatch = useDispatch()
  const AttendanceDetails = useSelector(
    (state: RootState) => state.AttedanceSlice
  )
  const UserEmail = useSelector((state: RootState) => state.user.Email)
  const CreateAttendance = async () => {
    const AttendanceRecorded = await CheckIn(
      UserEmail,
      new Date().toISOString(),
      AttendanceDetails.checkinStatus
    )
    if (AttendanceRecorded) {
      Dispatch(ToggleCheckin(!AttendanceDetails.checkinStatus))
      Dispatch(SetAttendanceID(AttendanceRecorded.attendance._id))
    }
  }
  return (
    <button
      onClick={CreateAttendance}
      className="check-btn check-in bg-green-500 w-full rounded-lg p-4 text-white flex items-center justify-center space-x-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-green-600"
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
          d="M5 13l4 4L19 7"
        />
      </svg>
      <span>Check In</span>
    </button>
  )
}

export default CheckinBtn
