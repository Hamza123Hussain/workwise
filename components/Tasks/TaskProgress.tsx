import React, { useEffect, useRef, useState } from 'react'

import { useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
import toast from 'react-hot-toast'
import { TaskFetch } from '@/utils/TaskformInterface'
import { FaEdit } from 'react-icons/fa' // Import the icon (or any other icon from react-icons)
import { updateTask } from '@/functions/Task/UpdateTask'
const progress_Class = (task: string) => {
  switch (task) {
    case 'TODO':
      return 'bg-red-500'
    case 'IN_PROGRESS':
      return 'bg-blue-600'
    case 'Minor_progress':
      return 'bg-yellow-400'
    default:
      return 'bg-green-500'
  }
}
const progressOptions = [
  { label: 'TODO', color: 'text-red-500' },
  { label: 'IN_PROGRESS', color: 'text-blue-600' },
  { label: 'Minor_progress', color: 'text-yellow-400' },
  { label: 'DONE', color: 'text-green-500' },
]
const TaskProgress = ({ TaskDetail }: { TaskDetail: TaskFetch }) => {
  const User = useSelector((state: RootState) => state.user)
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const [selectedProgress, setSelectedProgress] = useState(TaskDetail.progress)
  const handleProgressChange = async (newProgress: string) => {
    setSelectedProgress(newProgress)
    const Updated = await updateTask(
      TaskDetail._id,
      User.Email,
      newProgress,
      TaskDetail.description,
      TaskDetail.priority,
      TaskDetail.name,
      TaskDetail.dueDate
    )
    if (Updated) {
      toast.success('Task Has Been Updated')
      setIsDropdownVisible(false) // Close dropdown after selection
      // You can add logic here to update the progress in your backend or state
    }
  }
  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev) // Toggle dropdown visibility
  }
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  return (
    <div className="flex items-center flex-col justify-center text-sm text-white mb-2 sm:mb-0 relative cursor-pointer">
      <span className="font-medium mr-2">Progress</span>
      <div className="flex items-center">
        <span
          className={`font-bold text-xs ${progress_Class(
            selectedProgress
          )} text-transparent bg-clip-text`}
        >
          {selectedProgress}
        </span>

        {/* Edit Icon */}
        <FaEdit
          onClick={toggleDropdown} // Trigger dropdown on click
          className="ml-2 text-white cursor-pointer hover:text-gray-300"
        />
      </div>

      {/* Dropdown */}
      {isDropdownVisible && (
        <div
          ref={dropdownRef} // Reference to close dropdown when clicking outside
          className="absolute z-10 bg-white text-black shadow-lg rounded-lg p-2 w-40 mt-2"
          style={{ top: '100%', left: '50%', transform: 'translateX(-50%)' }}
        >
          <ul>
            {progressOptions.map((option) => (
              <li
                key={option.label}
                className={`cursor-pointer hover:bg-gray-200 py-1 px-2 ${option.color}`}
                onClick={() => handleProgressChange(option.label)} // Update progress when option is clicked
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
export default TaskProgress
