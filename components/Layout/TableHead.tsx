import React from 'react'

const TableHead = () => {
  return (
    <thead>
      <tr className="bg-purple-900">
        <th className="border border-purple-600 text-xs w-56 text-white p-2 text-[10px] sm:text-base md:text-lg">
          User Name
        </th>
        <th className="border border-purple-600 text-xs text-white p-2 text-[10px] sm:text-base md:text-lg">
          High Priority
        </th>
        <th className="border border-purple-600 text-xs text-white p-2 text-[10px] sm:text-base md:text-lg">
          Medium Priority
        </th>
        <th className="border border-purple-600 text-xs text-white p-2 text-[10px] sm:text-base md:text-lg">
          Low Priority
        </th>
        <th className="border border-purple-600 text-xs text-white p-2 text-[10px] sm:text-base md:text-lg">
          Task Assigned
        </th>
        <th className="border border-purple-600 text-xs text-white p-2 text-[10px] sm:text-base md:text-lg">
          Task Completed
        </th>
        <th className="border border-purple-600 text-xs text-white p-2 text-[10px] sm:text-base md:text-lg">
          Task Percentage
        </th>
      </tr>
    </thead>
  )
}

export default TableHead
