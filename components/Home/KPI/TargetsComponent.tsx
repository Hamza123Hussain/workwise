import { Target } from '@/utils/Interfaces/KPIInterface'
import React from 'react'

const TargetsComponent = ({ target }: { target: Target }) => {
  return (
    <div
      key={target.TargetName}
      className="py-3 flex gap-2 justify-between items-center"
    >
      {/* Left Section: Target Name and Priority */}
      <div>
        <h3 className="text-gray-800 font-medium">{target.TargetName}</h3>
        <p className="text-sm text-gray-500">{target.Priority} Priority</p>
      </div>
      {/* Right Section: Score */}
      <div className="flex items-center gap-1">
        <span className="text-indigo-600 font-semibold">
          {target.ValueAchieved}
        </span>
        <span className="text-gray-500">/</span>
        <span className="text-gray-700 font-semibold">
          {target.TargetValue}
        </span>
      </div>
    </div>
  )
}
export default TargetsComponent
