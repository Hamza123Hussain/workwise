import React, { useEffect } from 'react'
import TaskStatus from './TaskStatus'
import TimeBtn from './TimeBtn'
import Image from 'next/image'
import ShowingKpi from './KPI/ShowingKpi'
import { CurrentAttendance } from '@/functions/Attendance/CurrentAttendance'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
import {
  SetAttendanceID,
  ToggleCheckin,
} from '@/utils/Redux/Slice/AttendanceSlice/Attendance_Slice'
const HomePage = () => {
  const UserEmail = useSelector((state: RootState) => state.user.Email)
  const Dispatch = useDispatch()
  useEffect(() => {
    const GetCurrentAttendance = async () => {
      const AttendanceData = await CurrentAttendance(UserEmail)
      if (AttendanceData) {
        Dispatch(SetAttendanceID(AttendanceData._id))
        if (AttendanceData.exit) {
          Dispatch(ToggleCheckin(false))
        } else {
          Dispatch(ToggleCheckin(true))
        }
      }
    }
    GetCurrentAttendance()
  }, [])
  return (
    <div className="px-4 sm:px-6 w-full min-h-screen">
      {/* Welcome Message */}
      <div className="my-8 flex items-center justify-center">
        <Image
          width={250}
          height={250}
          src="/Logo.png"
          alt="Logo"
          className=" my-5"
          layout="fixed" // Ensures the image occupies the specified width and height
          placeholder="blur" // Adds a blur placeholder effect while loading
          blurDataURL="/Logo.png" // Optional: Add a low-resolution image for the blur effect
        />
      </div>
      {/* Main Content with Two Sections */}
      <div className="grid grid-cols-1 w-full gap-6 my-5">
        <div className="flex flex-col gap-5">
          <ShowingKpi />
          <TimeBtn />
          <TaskStatus />
        </div>
      </div>
    </div>
  )
}
export default HomePage
