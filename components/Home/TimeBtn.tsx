import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../utils/Redux/Store/Store'
import Loader from '../Loader'
import BreakMain from '../Attendance/Break/Main'
import { GetCurrentAttendance } from '@/functions/Attendance/Checkout/CurrentAttendance'
import CheckIn from '../Attendance/Checkout/Main'
import ShowTime from './ShowTime'
import { LocationCoords } from '@/utils/AttendanceInterface'
import { New_Location_Cords } from '@/utils/Redux/Slice/Location_Slice/Location_Slice'
import ShowAddress from './ShowAddress'
const TimeBtn: React.FC = () => {
  const dispatch = useDispatch()
  const User = useSelector((state: RootState) => state.user)
  const [onBreak, setOnBreak] = useState(false) // Break status
  const [loading, setLoading] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<Date>(new Date())
  const [checkinStatus, setCheckinStatus] = useState<boolean>(false)
  const [attendanceId, setAttendanceId] = useState<string | null>(null)
  const [currentLocation, setLocation] = useState<LocationCoords>({
    latitude: 0,
    longitude: 0,
  })
  useEffect(() => {
    // Function to update the current time
    const updateTime = () => {
      // Set the current time to the state variable 'currentTime'
      setCurrentTime(new Date())
    }
    // Start a timer that runs the 'updateTime' function every 1000 milliseconds (1 second)
    const timerId = setInterval(updateTime, 1000)
    // Cleanup function: stops the timer when the component is unmounted or re-rendered
    return () => clearInterval(timerId)
  }, []) // Empty dependency array means this useEffect runs only once after the component mounts
  useEffect(() => {
    GetCurrentAttendance(
      User.Email,
      setLoading,
      setAttendanceId,
      setCheckinStatus,
      setOnBreak,
      setLocation
    )
    if (currentLocation) {
      dispatch(New_Location_Cords(currentLocation))
    }
  }, [User])
  return (
    <div className="bg-purple-black sm:w-4/12 h-fit p-6 rounded-lg shadow-md border-2 border-purple-600">
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <ShowTime currentTime={currentTime} />
          <div className="flex flex-col gap-4 mt-2 lg:flex-row items-center justify-end">
            {checkinStatus ? (
              <BreakMain
                attendanceId={attendanceId}
                onBreak={onBreak}
                setOnBreak={setOnBreak}
              />
            ) : (
              ''
            )}
            <CheckIn
              setLoading={setLoading}
              currentTime={currentTime}
              checkinStatus={checkinStatus}
              attendanceId={attendanceId}
              setAttendanceId={setAttendanceId}
              setCheckinStatus={setCheckinStatus}
            />{' '}
          </div>
          {User.Email === 'gptprompts87@gmail.com' ? (
            <ShowAddress location={currentLocation} />
          ) : (
            ''
          )}
        </>
      )}
    </div>
  )
}
export default TimeBtn
