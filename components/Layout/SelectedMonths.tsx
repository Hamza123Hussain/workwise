import { months } from '@/utils/MonthsArray'
import { setMonth } from '@/utils/Redux/Slice/Sorting_Slice/Sorting_Slice'
import { RootState } from '@/utils/Redux/Store/Store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const SelectedMonths = () => {
  const SortTask = useSelector((state: RootState) => state.sort)
  const Disptach = useDispatch()
  return (
    <div className="mb-4 text-center flex justify-end items-end flex-col">
      <label htmlFor="User-select" className="mr-3 font-medium text-[#ac58ff]">
        Select Month
      </label>
      <select
        id="month"
        value={SortTask.Month}
        onChange={(e) => Disptach(setMonth(parseInt(e.target.value)))}
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
