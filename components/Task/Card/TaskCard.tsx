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
      className={`overflow-hidden shadow-lg border ${
        TaskDetails.Completed ? 'bg-green-400 text-white' : 'bg-white'
      } border-gray-200 transition-transform transform hover:scale-105 duration-200`}
    >
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex items-center">
        <RiCheckboxCircleFill className="text-white text-3xl mr-3" />
        <h1 className="text-white text-2xl font-bold">
          {TaskDetails.TaskName}
        </h1>
      </div>
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
      {/* Total Points */}
      <div className="flex items-center justify-between sm:flex-row flex-col mb-4 p-3">
        <span className="font-semibold text-lg">
          Points Gained: {TaskDetails.PointsGained}
        </span>
        <span className="font-semibold text-lg">
          Total Points: {TaskDetails.TotalPoints}
        </span>
      </div>
      {/* Delete Button */}
      {TaskDetails._id && TaskDetails.Completed !== true && (
        <DeleteButton _id={TaskDetails._id} />
      )}
      {/* Complete Task Button */}
      {TaskDetails.Completed !== undefined && (
        <CompleteButton
          TotalPoints={TaskDetails.TotalPoints}
          UserID={TaskDetails.UserId}
          TaskId={TaskDetails._id}
          Completed={TaskDetails.Completed}
        />
      )}
    </div>
  )
}
export default TaskCard
