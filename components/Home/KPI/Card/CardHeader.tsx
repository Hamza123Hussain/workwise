import { Target } from '@/utils/Interfaces/KPIInterface'
import React from 'react'

interface CardHeaderProps {
  UserName: string
  UserEmail: string
  PointsGained: number
  TotalPoints: number
  Targets: Target[]
  onEdit: () => void
}

const CardHeader = ({
  UserName,
  UserEmail,
  PointsGained,
  TotalPoints,
  Targets,
  onEdit,
}: CardHeaderProps) => {
  return (
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{UserName}</h3>
        <p className="text-sm text-gray-500 mb-2">
          <strong>Email:</strong> {UserEmail}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Points:</strong> {PointsGained} / {TotalPoints}
        </p>
        <p className="text-gray-600">
          <strong>Total Targets:</strong> {Targets.length}
        </p>
      </div>
      <button
        onClick={onEdit}
        className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
      >
        Edit
      </button>
    </div>
  )
}

export default CardHeader
