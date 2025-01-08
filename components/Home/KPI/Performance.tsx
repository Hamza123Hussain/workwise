import React from 'react'
import { FaChartLine } from 'react-icons/fa'

const PerformanceComponent = ({
  PointsGained,
  TotalPoints,
}: {
  PointsGained: number | undefined
  TotalPoints: number | undefined
}) => {
  return (
    <>
      <h2 className="text-lg font-bold flex items-center gap-2">
        <FaChartLine /> Performance Overview
      </h2>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span>Points Gained</span>
          <span className="font-bold">{PointsGained}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Total Points</span>
          <span className="font-bold">{TotalPoints}</span>
        </div>
      </div>
    </>
  )
}

export default PerformanceComponent
