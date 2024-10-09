// CheckIn.tsx
import React from 'react'
import { handleCheckInCheckOut } from '@/functions/Attendance/Checkout/Update'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
import { CheckInProps } from '@/utils/Checkout_Interface'
const CheckIn: React.FC<CheckInProps> = ({
  setLoading,
  currentTime,
  checkinStatus,
  attendanceId,
  setAttendanceId,
  setCheckinStatus,
}) => {
  const User = useSelector((state: RootState) => state.user)
  const handleButtonClick = async () => {
    setLoading(true) // Set loading state to true
    await handleCheckInCheckOut(
      User.Email,
      currentTime,
      checkinStatus,
      attendanceId,
      setAttendanceId,
      setCheckinStatus
    )
    setLoading(false) // Set loading state back to false
  }
  return (
    <button
      onClick={handleButtonClick}
      className={`${
        !checkinStatus ? 'bg-green-600' : 'bg-red-600'
      } text-white p-3 rounded-lg shadow hover:${
        !checkinStatus ? 'bg-green-800' : 'bg-red-900'
      } transition duration-200`}
    >
      {!checkinStatus ? 'Check In' : 'Check Out'}
    </button>
  )
}
export default CheckIn
