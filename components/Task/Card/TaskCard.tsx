import { RoleTask } from '@/utils/Interfaces/TaskformInterface'
import React from 'react'
import Priority_Date from './Priority_Date'
import Description from './Description'
import CompleteButton from './CompleteButton'
import DeleteButton from './DeleteButton'
import { RiCheckboxCircleFill } from 'react-icons/ri'
const TaskCard = ({ TaskDetails }: { TaskDetails: RoleTask }) => {
  return (
    <div
      className={`overflow-hidden shadow-lg border rounded-xl transition-transform duration-200 
      ${
        TaskDetails.Completed
          ? 'bg-green-100 text-gray-900 border-green-500'
          : 'bg-white text-gray-900 border-gray-300'
      } 
      hover:shadow-xl hover:scale-105`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-600 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <RiCheckboxCircleFill className="text-white text-3xl" />
          <h1 className="text-white text-xl font-semibold">
            {TaskDetails.TaskName}
          </h1>
        </div>
        <p className="text-white text-sm font-medium">{TaskDetails.UserName}</p>
      </div>
      {/* Priority & Date */}
      <Priority_Date
        Priority={TaskDetails.Priority}
        DueDate={TaskDetails.DueDate ? TaskDetails.DueDate : ''}
      />
      {/* Description */}
      {TaskDetails.Description && (
        <Description
          taskId={TaskDetails._id}
          Description={TaskDetails.Description}
          userID={TaskDetails.UserId}
        />
      )}
      {/* Points Section */}
      <div className="flex items-center justify-between px-6 py-3 border-t">
        <span className="font-medium text-lg">
          <span className="text-blue-700">Points Gained:</span>{' '}
          {TaskDetails.PointsGained || 0}
        </span>
        <span className="font-medium text-lg">
          <span className="text-blue-700">Total Points:</span>{' '}
          {TaskDetails.TotalPoints}
        </span>
      </div>
      {/* Action Buttons */}
      <div className="flex justify-between items-center px-6 py-4 border-t">
        {/* Delete Button */}
        {TaskDetails._id && !TaskDetails.Completed && (
          <DeleteButton _id={TaskDetails._id} />
        )}
        {/* Complete Task Button */}
        {TaskDetails.Completed !== undefined && (
          <CompleteButton
            TotalPoints={TaskDetails.TotalPoints}
            UserID={TaskDetails.UserId}
            TaskId={TaskDetails._id}
            Completed={TaskDetails.Completed}
            TargetName={TaskDetails.TaskName}
          />
        )}
      </div>
    </div>
  )
}
export default TaskCard
