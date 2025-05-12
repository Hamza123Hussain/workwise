import { RoleTask } from '@/utils/Interfaces/TaskformInterface'
import React from 'react'

interface ExtendedTask extends RoleTask {
  PointsGained?: number
  TotalPoints: number
}

const SmallTaskCard = ({ TaskDetail }: { TaskDetail: ExtendedTask }) => {
  const getPriorityColor = () => {
    switch (TaskDetail.Priority) {
      case 'High':
        return 'bg-red-500'
      case 'Medium':
        return 'bg-yellow-400'
      default:
        return 'bg-blue-400'
    }
  }

  return (
    <div
      className={`rounded-xl shadow-md border border-gray-200 p-4 transition-transform hover:scale-105 ${getPriorityColor()}`}
    >
      <h2
        className="text-lg font-semibold text-white truncate mb-2"
        title={TaskDetail.TaskName}
      >
        {TaskDetail.TaskName}
      </h2>

      <div className="flex justify-between items-center text-sm text-white mb-2">
        <div>
          <span className="font-medium">Priority:</span> {TaskDetail.Priority}
        </div>
        <div>
          <span className="font-medium">Points:</span>{' '}
          {TaskDetail.PointsGained ?? 0} / {TaskDetail.TotalPoints}
        </div>
      </div>

      <div>
        <p
          className="text-white text-xs truncate"
          title={TaskDetail.Description}
        >
          {TaskDetail.Description}
        </p>
      </div>
    </div>
  )
}

export default SmallTaskCard
