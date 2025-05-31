import {
  ResetFlags,
  setMonth,
} from '@/utils/Redux/Slice/Sorting_Slice/Sorting_Slice'
import { RootState } from '@/utils/Redux/Store/Store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { months } from '@/utils/Array/MonthsArray'
import YearFilter from './YearFilter'
import PriorityFilter from './PriorityFilter'
const Filters = ({ Flag }: { Flag?: boolean }) => {
  const SortTask = useSelector((state: RootState) => state.sort)
  const Dispatch = useDispatch()
  const FilterTasksBy_Month = (e: React.ChangeEvent<HTMLSelectElement>) => {
    Dispatch(ResetFlags())
    Dispatch(setMonth(parseInt(e.target.value))) // Update Redux state
  }
  return (
    <div className="flex gap-4 justify-end items-center">
      <div className="flex flex-col">
        <label htmlFor="monthFilter" className="font-medium text-[#ac58ff]">
          Select Month
        </label>
        <select
          id="monthFilter"
          value={SortTask.Month}
          onChange={(e) => FilterTasksBy_Month(e)}
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
      {/* Year Filter */}
      <YearFilter />
      {/* Month Filter */}
      <div className="flex flex-col">
        <label htmlFor="monthFilter" className="font-medium text-[#ac58ff]">
          Select Month
        </label>
        <select
          id="monthFilter"
          value={SortTask.Month}
          onChange={(e) => FilterTasksBy_Month(e)}
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
      {Flag && <></>}
      {/* Priority Filter */}
      <PriorityFilter />
    </div>
  )
}
export default Filters
