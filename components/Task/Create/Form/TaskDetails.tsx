import React from 'react'
const TaskDetails = ({
  Priority,
  TotalPoints,
}: {
  Priority: string
  TotalPoints: number
}) => {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Priority
        </label>
        <input
          name="Priority"
          value={Priority}
          readOnly
          className="w-full rounded border-gray-300 p-2 bg-gray-100 cursor-not-allowed"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Total Points
        </label>
        <input
          name="TotalPoints"
          value={TotalPoints}
          readOnly
          className="w-full rounded border-gray-300 p-2 bg-gray-100 cursor-not-allowed"
        />
      </div>
    </>
  )
}

export default TaskDetails
