import React, { useState, useEffect } from 'react'
import Loader from '../Loader'
import BreakMain from '../Attendance/Break/Main'
import ShowTime from './ShowTime'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
import CheckinBtn from './Attendance/CheckinBtn'
import Checkoubtn from './Attendance/Checkoutbtn'
const TimeBtn: React.FC = () => {
  const AttendanceDetails = useSelector(
    (state: RootState) => state.AttedanceSlice
  )
  const Dispatch = useDispatch()
  const [onBreak, setOnBreak] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    setLoading(false)
  }, [Dispatch]) // ✅ Add Dispatch to dependency array
  return (
    <div className="w-full p-6 rounded-lg shadow-md border-2 border-purple-600">
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex flex-col  gap-4 sm:gap-8">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <ShowTime />
            </div>
          </div>
          <div className="flex sm:flex-row flex-col gap-4 mt-4">
            <div className="w w-full">
              {AttendanceDetails.checkinStatus ? (
                <Checkoubtn />
              ) : (
                <CheckinBtn />
              )}
            </div>
            <div className="w-full flex justify-center sm:justify-start">
              {AttendanceDetails.checkinStatus && (
                <BreakMain
                  attendanceId={AttendanceDetails.attendanceId}
                  onBreak={onBreak}
                  setOnBreak={setOnBreak}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
export default TimeBtn
