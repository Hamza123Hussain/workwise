import { Target } from '@/utils/Interfaces/KPIInterface'
import React from 'react'

const TargetsComponent = ({ target }: { target: Target }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 w-full">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-gray-800 font-semibold text-sm">
            {target.TargetName}
          </h3>
          <p className="text-sm text-gray-500">{target.Priority} Priority</p>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <span className="text-green-600 font-bold">
            {target.ValueAchieved}
          </span>
          <span className="text-gray-500">/</span>
          <span className="text-gray-700 font-bold">{target.TargetValue}</span>
        </div>
      </div>
    </div>
  )
}

export default TargetsComponent
