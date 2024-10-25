import React from 'react'

const Dropdowns = ({
  timeFilter,
  setTimeFilter,
  statusFilter,
  setStatusFilter,
}: {
  timeFilter: string
  setTimeFilter: (time: string) => void
  statusFilter: string
  setStatusFilter: (status: string) => void
}) => {
  return (
    <div className="flex gap-4 mb-4 justify-end mr-5">
      <div className="flex flex-col">
        <label htmlFor="timeFilter" className="text-black mb-1">
          Timeframe
        </label>
        <select
          id="timeFilter"
          className="border-2 border-white text-white p-2 rounded-lg 
           focus:outline-none focus:ring focus:ring-white bg-[#a56edd] transition ease-in-out"
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Weekly">Weekly</option>
          <option value="Daily">Daily</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="statusFilter" className="text-black mb-1">
          Progress
        </label>
        <select
          id="statusFilter"
          className="border-2 border-white text-white p-2 rounded-lg 
           focus:outline-none focus:ring focus:ring-white bg-[#a56edd] transition ease-in-out"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="TODO">TODO</option>
          <option value="DONE">DONE</option>
          <option value="Minor_progress">Minor Progress</option>
          <option value="IN_PROGRESS">In Progress</option>
        </select>
      </div>
    </div>
  )
}

export default Dropdowns
