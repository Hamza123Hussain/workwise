import { TaskFetch } from '@/utils/Interfaces/TaskformInterface'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaCheckCircle, FaExclamationTriangle, FaCircle } from 'react-icons/fa'

const TaskCard = ({ allTasks }: { allTasks: TaskFetch[] }) => {
  const Router = useRouter()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {allTasks.length > 0 ? (
        allTasks.map((task) => (
          <div
            key={task.createdAt}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
          >
            {/* Task Title */}
            <div className="flex justify-between items-center">
              <h3
                className="text-xl font-semibold text-[#6a4ffc] truncate"
                style={{ minHeight: '50px' }}
              >
                {task.name}
              </h3>
            </div>
            {/* Task Due Date and Priority Badge */}
            <div
              className="mt-2 flex items-center justify-between"
              style={{ minHeight: '40px' }}
            >
              <span
                className="text-sm text-gray-500 truncate"
                style={{ minWidth: '120px' }}
              >
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
              <span
                className={`px-3 py-1 text-xs rounded-lg ${
                  task.priority === 'HIGH'
                    ? 'bg-red-400 text-white'
                    : task.priority === 'MEDIUM'
                    ? 'bg-yellow-400 text-black'
                    : 'bg-green-400 text-white'
                }`}
                style={{ minWidth: '80px', textAlign: 'center' }}
              >
                {task.priority}
              </span>
            </div>
            {/* Task Progress */}
            <div
              className="flex justify-between items-center mt-3"
              style={{ minHeight: '40px' }}
            >
              <div className="flex items-center">
                {task.progress === 'DONE' ? (
                  <FaCheckCircle className="text-green-500" />
                ) : task.progress === 'TODO' ? (
                  <FaExclamationTriangle className="text-yellow-500" />
                ) : (
                  <FaCircle className="text-red-500" />
                )}
                <span className="ml-2 text-sm">{task.progress}</span>
              </div>
            </div>
            {/* Edit Button */}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => Router.push(`/edittask/${task._id}`)}
                className="text-white bg-blue-600 p-2 px-6 rounded-lg hover:brightness-150 text-sm"
              >
                Edit
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-3 text-center text-gray-400 p-4">
          No tasks available.
        </div>
      )}
    </div>
  )
}

export default TaskCard
