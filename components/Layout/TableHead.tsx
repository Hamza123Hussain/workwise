import React from 'react'

const TableHead = () => {
  return (
    <thead>
      <tr className="bg-[#bd8bff]">
        <th className="border border-purple-600 text-xs w-56 text-white p-2 py-4 text-[14px]  ">
          User Name
        </th>
        <th className="border border-purple-600 text-xs text-white p-2 py-4 text-[14px]  ">
          High Priority
        </th>
        <th className="border border-purple-600 text-xs text-white p-2 py-4 text-[14px]  ">
          Medium Priority
        </th>
        <th className="border border-purple-600 text-xs text-white p-2 py-4 text-[14px]  ">
          Low Priority
        </th>
        <th className="border border-purple-600 text-xs text-white p-2 py-4 text-[14px]  ">
          Task Assigned
        </th>
        <th className="border border-purple-600 text-xs text-white p-2 py-4 text-[14px]  ">
          Task Completed
        </th>
        <th className="border border-purple-600 text-xs text-white p-2 py-4 text-[14px]  ">
          Task Percentage
        </th>
      </tr>
    </thead>
  )
}

export default TableHead
