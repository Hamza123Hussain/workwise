import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../utils/Redux/Store/Store'
import Loader from '../Loader'
import BreakMain from '../Attendance/Break/Main'
import CheckIn from '../Attendance/Checkout/Main'
import ShowTime from './ShowTime'
import ShowAddress from './ShowAddress'
import { GetCurrentAttendance } from '@/functions/Attendance/Checkout/CurrentAttendance'
import { LocationCoords } from '@/utils/AttendanceInterface'
const TimeBtn: React.FC = () => {
  const User = useSelector((state: RootState) => state.user)
  const [onBreak, setOnBreak] = useState<boolean>(false) // Break status
  const [loading, setLoading] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<Date>(new Date())
  const [checkinStatus, setCheckinStatus] = useState<boolean>(false)
  const [attendanceId, setAttendanceId] = useState<string | null>(null)
  const [currentLocation, setLocation] = useState<LocationCoords>({
    latitude: 0,
    longitude: 0,
    location: '',
  })
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date())
    }
    const timerId = setInterval(updateTime, 1000)
    return () => clearInterval(timerId)
  }, [])
  useEffect(() => {
    if (User?.Email) {
      GetCurrentAttendance(
        User.Email,
        setLoading,
        setAttendanceId,
        setCheckinStatus,
        setOnBreak,
        setLocation
      )
    }
  }, [User])
  return (
    <div className="   w-full h-fit p-6 rounded-lg shadow-md border-2 border-purple-600">
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <ShowTime currentTime={currentTime} />
          <div className="flex  gap-4 mt-4 flex-col items-center justify-end">
            <ShowAddress location={currentLocation} />{' '}
            <div className="flex  gap-4 mt-4 items-center w-full">
              {checkinStatus && (
                <BreakMain
                  attendanceId={attendanceId}
                  onBreak={onBreak}
                  setOnBreak={setOnBreak}
                />
              )}
              <CheckIn
                setLoading={setLoading}
                currentTime={currentTime}
                checkinStatus={checkinStatus}
                attendanceId={attendanceId}
                setAttendanceId={setAttendanceId}
                setCheckinStatus={setCheckinStatus}
                setLocation={setLocation}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
export default TimeBtn
