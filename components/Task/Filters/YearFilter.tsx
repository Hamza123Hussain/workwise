import {
  ResetFlags,
  setYear,
} from '@/utils/Redux/Slice/Sorting_Slice/Sorting_Slice'
import { RootState } from '@/utils/Redux/Store/Store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const YearFilter = () => {
  const SortTask = useSelector((state: RootState) => state.sort)
  const Dispatch = useDispatch()
  const currentYear = new Date().getFullYear()
  const FilterTasksBy_Year = (e: React.ChangeEvent<HTMLSelectElement>) => {
    Dispatch(ResetFlags())
    Dispatch(setYear(parseInt(e.target.value))) // Update Redux state
  }
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i) // Generates last 5 years
  return (
    <div className="flex flex-col">
      <label htmlFor="yearFilter" className="font-medium text-[#ac58ff]">
        Select Year
      </label>
      <select
        id="yearFilter"
        value={SortTask.Year}
        onChange={(e) => FilterTasksBy_Year(e)}
        className="border-2 border-white text-white p-2 rounded-lg 
          focus:outline-none focus:ring focus:ring-white bg-[#a56edd] transition ease-in-out"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  )
}

export default YearFilter
