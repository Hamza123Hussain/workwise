import {
  ResetFlags,
  setPriority,
} from '@/utils/Redux/Slice/Sorting_Slice/Sorting_Slice'
import { RootState } from '@/utils/Redux/Store/Store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
const PriorityFilter = () => {
  const SortTask = useSelector((state: RootState) => state.sort)
  const Dispatch = useDispatch()
  const FilterTasksBy_Priority = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPriority = e.target.value
    Dispatch(ResetFlags())
    Dispatch(setPriority(selectedPriority)) // Update Redux state
  }
  return (
    <div className="flex flex-col">
      <label htmlFor="priorityFilter" className="text-[#ac58ff] mb-1">
        Priority
      </label>
      <select
        id="priorityFilter"
        value={SortTask.Priority}
        onChange={(e) => FilterTasksBy_Priority(e)}
        className="border-2 border-white text-white p-2 rounded-lg 
              focus:outline-none focus:ring focus:ring-white bg-[#a56edd] transition ease-in-out"
      >
        <option value="">All</option>
        <option value="Low">LOW</option>
        <option value="Medium">MEDIUM</option>
        <option value="High">HIGH</option>
      </select>
    </div>
  )
}

export default PriorityFilter
