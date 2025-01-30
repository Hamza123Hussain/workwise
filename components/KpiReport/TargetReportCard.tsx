import { Target } from '@/utils/Interfaces/KPIInterface'
import React from 'react'

const TargetReportCard = ({ target }: { target: Target }) => {
  return (
    <div
      // Unique key for each target
      className={`rounded-lg p-2 shadow-lg ${
        target.Priority === 'High'
          ? 'bg-gradient-to-r from-red-400 to-red-600 text-white'
          : target.Priority === 'Medium'
          ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800'
          : 'bg-gradient-to-r from-green-400 to-green-600 text-white'
      } hover:scale-105 transition-transform duration-300 ease-in-out`}
    >
      {/* Target name */}
      <p className="text-xl font-bold">{target.TargetName}</p>
      {/* Target achievement details */}
      <p className="text-lg mt-2">
        Achieved: <span className="font-semibold">{target.ValueAchieved}</span>{' '}
        / <span className="font-semibold">{target.TargetValue}</span>
      </p>
      {/* Target priority level */}
      <div className="flex justify-between items-center mt-3">
        <p className="text-sm font-medium">Priority: {target.Priority}</p>
        <div className="flex gap-4 items-center">
          <p className="text-sm font-medium">
            Points Gained:{' '}
            <span className="font-semibold">{target.PointsGained}</span>
          </p>
          <p className="text-sm font-medium">
            Total Points:{' '}
            <span className="font-semibold">{target.TotalPoints}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default TargetReportCard
