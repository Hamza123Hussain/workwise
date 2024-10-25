import {
  setPriority,
  setStatus,
  setTime,
} from '@/utils/Redux/Slice/Sorting_Slice/Sorting_Slice'
import { RootState } from '@/utils/Redux/Store/Store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
const Dropdowns = () => {
  const SortTask = useSelector((state: RootState) => state.sort)
  const Disptach = useDispatch()
  return (
    <div className="flex gap-4 mb-4 justify-end mr-5">
      <div className="flex flex-col">
        <label htmlFor="timeFilter" className="text-[#ac58ff] mb-1 text-left">
          Timeframe
        </label>
        <select
          id="timeFilter"
          className="border-2 border-white text-white p-2 rounded-lg 
           focus:outline-none focus:ring focus:ring-white bg-[#a56edd] transition ease-in-out"
          value={SortTask.TimeFrame}
          onChange={(e) => Disptach(setTime(e.target.value))}
        >
          <option value="All">All</option>
          <option value="Weekly">Weekly</option>
          <option value="Daily">Daily</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="statusFilter" className="text-[#ac58ff] mb-1 text-left">
          Progress
        </label>
        <select
          id="statusFilter"
          className="border-2 border-white text-white p-2 rounded-lg 
           focus:outline-none focus:ring focus:ring-white bg-[#a56edd] transition ease-in-out"
          value={SortTask.Status}
          onChange={(e) => Disptach(setStatus(e.target.value))}
        >
          <option value="All">All</option>
          <option value="TODO">TODO</option>
          <option value="DONE">DONE</option>
          <option value="Minor_progress">Minor Progress</option>
          <option value="IN_PROGRESS">In Progress</option>
        </select>
      </div>{' '}
      <div className="flex flex-col">
        <label
          htmlFor="priorityFilter"
          className="text-[#ac58ff] mb-1 text-left"
        >
          Priority
        </label>
        <select
          id="priorityFilter"
          className="border-2 border-white text-white p-2 rounded-lg 
           focus:outline-none focus:ring focus:ring-white bg-[#a56edd] transition ease-in-out"
          value={SortTask.Prirority}
          onChange={(e) => Disptach(setPriority(e.target.value))}
        >
          <option value="All">All</option>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>
      </div>
    </div>
  )
}
export default Dropdowns
