import { RoleTask } from '@/utils/Interfaces/TaskformInterface'
import React from 'react'
// ✅ Extended interface for optional PointsGained and required TotalPoints
interface ExtendedTask extends RoleTask {
  PointsGained?: number
  TotalPoints: number
}
const SmallTaskCard = ({ TaskDetail }: { TaskDetail: ExtendedTask }) => {
  // 🎨 Return modern, accessible Tailwind background color based on priority
  const getPriorityColor = () => {
    switch (TaskDetail.Priority) {
      case 'High':
        return 'bg-red-500' // Modern red
      case 'Medium':
        return 'bg-yellow-400' // Modern yellow
      default:
        return 'bg-blue-400' // Modern blue for Low
    }
  }
  return (
    <div
      className={`${getPriorityColor()} rounded-xl h-40 shadow-md border border-gray-200 hover:shadow-xl p-5 w-full max-w-sm mx-auto my-4 transition-transform duration-300 hover:scale-105`}
    >
      {/* 📌 Task Name */}
      <h2
        className="text-lg sm:text-xl font-bold text-white border-b border-white pb-2 mb-4 truncate"
        title={TaskDetail.TaskName}
      >
        {TaskDetail.TaskName}
      </h2>
      {/* 🔻 Priority & Points Info */}
      <div className="flex justify-between items-center mb-4 text-white text-sm">
        <div>
          <span className="font-medium">Priority:</span>{' '}
          <span className="font-bold">{TaskDetail.Priority}</span>
        </div>
        <div>
          <span className="font-medium">Points:</span>{' '}
          <span className="font-bold">
            {TaskDetail.PointsGained ?? 0} / {TaskDetail.TotalPoints}
          </span>
        </div>
      </div>
      {/* 📝 Description */}
      <div className="text-white text-sm">
        <h3 className="font-semibold mb-1">Description</h3>
        <p
          className="text-xs font-medium truncate"
          title={TaskDetail.Description}
        >
          {TaskDetail.Description}
        </p>
      </div>
    </div>
  )
}
export default SmallTaskCard
