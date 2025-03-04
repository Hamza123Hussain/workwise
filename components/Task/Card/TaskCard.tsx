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
      className={`overflow-hidden shadow-md border rounded-lg transition-transform duration-200 ${
        // Muted Green for completed tasks
        'bg-[#F8F9FA] text-gray-900' // Light Gray background for pending tasks
      } hover:shadow-lg hover:scale-105`}
    >
      {/* Header with a professional gradient */}
      <div className="bg-gradient-to-r from-[#1E3A8A] to-[#4F46E5] px-6 py-4 flex items-center">
        <RiCheckboxCircleFill className="text-white text-3xl mr-3" />
        <h1 className="text-white text-xl font-semibold">
          {TaskDetails.TaskName}
        </h1>
      </div>

      {/* Priority & Date */}
      <Priority_Date
        Priority={TaskDetails.Priority}
        DueDate={TaskDetails.DueDate ? TaskDetails.DueDate : ''}
      />

      {/* Editable Description */}
      {TaskDetails.Description && (
        <Description
          taskId={TaskDetails._id}
          Description={TaskDetails.Description}
          userID={TaskDetails.UserId}
        />
      )}

      {/* Points Section */}
      <div className="flex items-center justify-between sm:flex-row flex-col mb-4 p-4">
        <span className="font-medium text-lg">
          <span className="text-[#1E40AF]">Points Gained:</span>{' '}
          {TaskDetails.PointsGained}
        </span>
        <span className="font-medium text-lg">
          <span className="text-[#1E40AF]">Total Points:</span>{' '}
          {TaskDetails.TotalPoints}
        </span>
      </div>

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
  )
}

export default TaskCard
