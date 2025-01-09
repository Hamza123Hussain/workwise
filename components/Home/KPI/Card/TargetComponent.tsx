import { Target } from '@/utils/Interfaces/KPIInterface'
import React from 'react'
const TargetComponent = ({ target }: { target: Target }) => {
  return (
    <div key={target.TargetName} className="py-2 flex flex-col gap-1">
      <p
        className={`text-sm font-bold ${
          target.TargetAchieved ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {target.TargetName}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Achieved:</strong> {target.ValueAchieved} / {target.TargetValue}
      </p>
      <span
        className={`text-xs px-2 py-1 rounded self-start ${
          target.TargetAchieved
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
        }`}
      >
        {target.TargetAchieved ? 'Achieved' : 'Pending'}
      </span>
    </div>
  )
}
export default TargetComponent
