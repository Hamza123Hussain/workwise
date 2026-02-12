import React, { useEffect } from 'react'
import AttendanceButton from './AttendanceButton'
import AttendanceRecords from './AttendanceRecords'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
import { GetMonthlyHours } from '@/functions/Attendance/GetMonthlyHours'
import { SetHoursWorked } from '@/utils/Redux/Slice/AttendanceSlice/Attendance_Slice'
const AttendanceSection = () => {
  const HoursWorked = useSelector(
    (state: RootState) => state.AttedanceSlice.HoursWorked,
  )
  const Dispatch = useDispatch()
  const TotalHours = 160 // Example total monthly working hours
  const User = useSelector((state: RootState) => state.user)
  useEffect(() => {
    const GetHours = async () => {
      const hours = await GetMonthlyHours(User._id)
      Dispatch(SetHoursWorked(hours || 0))
    }
    GetHours()
  }, [User._id, Dispatch])
  const percentage = (HoursWorked / TotalHours) * 100
  return (
    <div className=" flex flex-col py-5 px-[10px] rounded-[20px] min-w-[25vw] bg-[#E5EDFF] shadow-sm shadow-[#2F1E5E40]">
      <h3 className=" text-[24px] text-[#b0bcce] font-bold ">Attendance</h3>
      <div className=" flex justify-between px-[5px]">
        <div className=" flex items-center gap-[2px]">
          <h1 className="text-[20px] font-bold text-[#475467]">
            {HoursWorked.toFixed(1)}
          </h1>
          <sub className=" text-[14px] font-bold text-[#475467] ">hrs</sub>
        </div>
        <h3 className=" text-[48px] font-bold text-[#6D3DF1]">
          {percentage.toFixed(1)}%
        </h3>
      </div>
      <div className="bg-[#2F1E5E] w-full rounded-[100px]">
        <div
          className="bg-[#6D3DF1] h-[19px] rounded-[100px] transition-all duration-300"
          style={{ width: `${percentage.toFixed(1)}%` }}
        />
      </div>
      <div className=" flex justify-end ">
        <h1 className="text-[#101828] font-medium text-[14px]">
          Total 160 hrs
        </h1>
      </div>
      <AttendanceButton />
      <AttendanceRecords />
    </div>
  )
}
export default AttendanceSection
