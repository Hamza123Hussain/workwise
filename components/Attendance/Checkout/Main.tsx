import React from 'react'
import { handleCheckInCheckOut } from '@/functions/Attendance/Checkout/Update'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
import { CheckInProps } from '@/utils/Interfaces/Checkout_Interface'
import { FaCheckCircle, FaSignOutAlt } from 'react-icons/fa'
import clsx from 'clsx'
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
    setLoading(true)
    await handleCheckInCheckOut(
      User.Email,
      currentTime,
      checkinStatus,
      attendanceId,
      setAttendanceId,
      setCheckinStatus
    )
    setLoading(false)
  }
  return (
    <button
      onClick={handleButtonClick}
      className={clsx(
        'p-4 rounded-lg shadow-lg w-full flex items-center justify-center transition duration-300 ease-in-out',
        {
          'bg-green-500 hover:bg-green-600': !checkinStatus, // Check In
          'bg-orange-600 hover:bg-orange-700': checkinStatus, // Check Out
        }
      )}
    >
      <span className="mr-3">
        {!checkinStatus ? (
          <FaCheckCircle className="text-white text-xl" />
        ) : (
          <FaSignOutAlt className="text-white text-xl" />
        )}
      </span>
      <span className="font-semibold text-white text-lg">
        {!checkinStatus ? 'Check In' : 'Check Out'}
      </span>
    </button>
  )
}
export default CheckIn
