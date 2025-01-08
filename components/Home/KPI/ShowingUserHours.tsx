import { GetMonthlyHours } from '@/functions/Attendance/GetMonthlyHours'
import { RootState } from '@/utils/Redux/Store/Store'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
const MonthlyHoursWorked = () => {
  const [HoursWorked, setHours] = useState<number>(0)
  const TotalHours = 168 // Example total monthly working hours
  const User = useSelector((state: RootState) => state.user)
  useEffect(() => {
    const GetHours = async () => {
      const hours = await GetMonthlyHours(User._id)
      setHours(hours || 0)
    }
    GetHours()
  }, [User._id])
  const percentage = (HoursWorked / TotalHours) * 100
  const RemainingHours = TotalHours - HoursWorked
  return (
    <div className="flex flex-col items-center justify-between p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg text-white">
      <h1 className="text-2xl font-bold mb-4">Monthly Hours Tracker</h1>
      <div className="w-48 h-48">
        <CircularProgressbar
          value={percentage}
          text={`${HoursWorked.toFixed(1)} hrs`}
          styles={buildStyles({
            textSize: '16px',
            textColor: '#ffffff',
            pathColor: '#34d399', // Green for worked hours
            trailColor: '#d1d5db', // Light gray for remaining hours
          })}
        />
      </div>
      <div className="mt-6 text-center">
        <p className="text-lg">
          <span className="font-semibold">{RemainingHours.toFixed(1)}</span> hrs
          remaining
        </p>
        <p className="text-sm opacity-80">Out of {TotalHours} hrs this month</p>
      </div>
    </div>
  )
}
export default MonthlyHoursWorked
