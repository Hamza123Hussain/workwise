import { RoleTask } from '@/utils/Interfaces/TaskformInterface'
import React from 'react'
import { FaTasks } from 'react-icons/fa'
import Priority_Date from './Priority_Date'
import Description from './Description'
import CompleteButton from './CompleteButton'
import { getPriorityBg } from '@/functions/UserTasks/GetBgColoronPriority'
const TaskCard = ({ TaskDetails }: { TaskDetails: RoleTask }) => {
  return (
    <div
      className={`flex flex-col p-4 rounded-lg shadow-lg border transition-all duration-200 ${getPriorityBg(
        TaskDetails.Priority
      )} hover:shadow-xl`}
    >
      {/* Task Name */}
      <h1 className="text-2xl font-bold flex items-center mb-4">
        <FaTasks className="mr-2 text-blue-500" /> {/* Changed icon color */}
        {TaskDetails.TaskName}
      </h1>
      <Priority_Date
        Priority={TaskDetails.Priority}
        DueDate={TaskDetails.DueDate ? TaskDetails.DueDate : ''}
      />
      {/* Editable Description */}
      {TaskDetails.Description && (
        <Description Description={TaskDetails.Description} />
      )}
      {/* Total Points */}
      <div className="flex items-center mb-4">
        <span className="font-semibold text-lg">
          Total Points: {TaskDetails.TotalPoints}
        </span>
      </div>
      {/* Complete Task Button */}
      {TaskDetails.Completed && (
        <CompleteButton Completed={TaskDetails.Completed} />
      )}
    </div>
  )
}
export default TaskCard
