import { Target } from '@/utils/Interfaces/KPIInterface'
import React from 'react'

const CardHeader = ({
  UserName,
  UserEmail,
  PointsGained,
  TotalPoints,
  Targets,
}: {
  UserName: string
  UserEmail: string
  PointsGained: number
  TotalPoints: number
  Targets: Target[]
}) => {
  return (
    <>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{UserName}</h3>
      <p className="text-sm text-gray-500 mb-4">
        <strong>Email:</strong> {UserEmail}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Points:</strong> {PointsGained} / {TotalPoints}
      </p>
      <p className="text-gray-600 mb-4">
        <strong>Total Targets:</strong> {Targets.length}
      </p>
    </>
  )
}

export default CardHeader
