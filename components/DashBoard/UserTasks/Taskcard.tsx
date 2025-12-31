import { RoleTask } from '@/utils/Interfaces/TaskformInterface'
import React from 'react'
import TaskButtons from './TaskButtons'
import TaskDescription from './TaskDescription'

const Taskcard = ({ task }: { task: RoleTask }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'border-l-red-500'
      case 'Medium':
        return 'border-l-yellow-400'
      default:
        return 'border-l-blue-500'
    }
  }

  // Format DueDate as DD-MM-YYYY
  const formatDueDate = (dateStr: string) => {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return '--'
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // Month is 0-based
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  return (
    <div
      className={`flex justify-between items-center px-4 py-2 border-b border-[#E8E8E8] border-l-8 ${getPriorityColor(
        task.Priority
      )} relative`}
    >
      <div className="w-[25%] pl-4">
        <span className={`text-[14px] font-medium ${'text-[#3E3E3E]'}`}>
          {task.TaskName}
        </span>
      </div>
      <div className="w-[20%] text-center text-[14px] font-medium text-[#3E3E3E]">
        {task.DueDate ? formatDueDate(task.DueDate) : ''}
      </div>
      <div className="w-[35%] flex justify-center">
        <input
          type="text"
          value={task.Description}
          disabled
          autoFocus
          className="border border-[#DADADA] bg-white px-2 py-1 rounded-md w-[90%] text-[13px] text-[#475267] focus:outline-none focus:ring-1 focus:ring-[#B994E6]"
        />
      </div>
    </div>
  )
}

export default Taskcard
