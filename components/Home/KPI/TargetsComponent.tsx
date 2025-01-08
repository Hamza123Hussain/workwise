import { Target } from '@/utils/Interfaces/KPIInterface'
import React from 'react'

const TargetsComponent = ({ target }: { target: Target }) => {
  return (
    <div key={target.TargetName} className="py-3 flex justify-between">
      <div>
        <h3 className="text-gray-800 font-medium">{target.TargetName}</h3>
        <p className="text-sm text-gray-500">{target.Priority} Priority</p>
      </div>
      <div className="text-right">
        <span className="text-indigo-600 font-semibold">
          {target.ValueAchieved}
        </span>
        <span className="text-gray-500"> / {target.TargetValue}</span>
      </div>
    </div>
  )
}

export default TargetsComponent
