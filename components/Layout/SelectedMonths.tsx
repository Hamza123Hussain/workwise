import { months } from '@/utils/MonthsArray'
import React from 'react'

const SelectedMonths = ({
  selectedMonth,
  setSelectedMonth,
}: {
  selectedMonth: number
  setSelectedMonth: (month: number) => void
}) => {
  return (
    <div className="mb-4 text-center flex justify-end items-end flex-col">
      <label htmlFor="User-select" className="mr-3 font-medium text-[#ac58ff]">
        Select Month
      </label>
      <select
        id="month"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
        className="border-2 border-white text-white p-2 rounded-lg 
           focus:outline-none focus:ring focus:ring-white bg-[#a56edd] transition ease-in-out"
      >
        {months.map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </select>
    </div>
  )
}
export default SelectedMonths
