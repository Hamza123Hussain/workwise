import React from 'react'
import { FaChartLine } from 'react-icons/fa'

// Helper function to calculate the percentage of points achieved
const calculatePercentage = (pointsGained: number, totalPoints: number) => {
  return (pointsGained / totalPoints) * 100
}

// Circular progress component
const CircularProgress = ({ percentage }: { percentage: number }) => {
  return (
    <div className="relative w-24 h-24">
      <svg
        className="absolute top-0 left-0"
        viewBox="0 0 36 36"
        width="100%"
        height="100%"
      >
        <path
          className="circle-background"
          fill="none"
          stroke="#e6e6e6"
          strokeWidth="3"
          d="M18 2 a16 16 0 1 1 0 32 a16 16 0 1 1 0 -32"
        />
        <path
          className="circle-progress"
          fill="none"
          stroke="#4db8ff"
          strokeWidth="3"
          strokeDasharray={`${percentage}, 100`}
          d="M18 2 a16 16 0 1 1 0 32 a16 16 0 1 1 0 -32"
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 p-2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold text-blue-500">
        {percentage.toFixed(1)}%
      </div>
    </div>
  )
}

const PerformanceComponent = ({
  PointsGained,
  TotalPoints,
}: {
  PointsGained: number | undefined
  TotalPoints: number | undefined
}) => {
  if (PointsGained === undefined || TotalPoints === undefined) {
    return null // Return null if no points data is available
  }

  const remainingPoints = TotalPoints - PointsGained
  const percentage = calculatePercentage(PointsGained, TotalPoints) // Calculate the percentage of points gained

  return (
    <>
      <h2 className="text-lg font-bold flex items-center gap-2">
        <FaChartLine /> Performance Overview
      </h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span>Points Gained</span>
          <span className="font-bold">{PointsGained}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Total Points</span>
          <span className="font-bold">{TotalPoints}</span>
        </div>

        {/* Circular progress bar showing remaining points */}
        <div className="flex justify-center mt-4">
          <CircularProgress percentage={percentage} />
        </div>

        <div className="flex justify-between items-center">
          <span>Remaining Points</span>
          <span className="font-bold">{remainingPoints}</span>
        </div>
      </div>
    </>
  )
}

export default PerformanceComponent
