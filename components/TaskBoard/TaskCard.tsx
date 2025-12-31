import React from 'react'
const TaskCard = ({ simpleTask }: { simpleTask: any }) => {
  // Function to format dates to a readable format
  const formatDate = (date: Date) => new Date(date).toLocaleDateString()
  return (
    <div
      className={`w-full max-w-md rounded-2xl p-5 border ${'bg-white border-gray-200'} shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.01]`}
    >
      {/* Top Section */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {simpleTask.description}
          </h2>
        </div>
      </div>
      {/* Task Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm text-gray-700">
        <div>
          <span className="font-semibold">User:</span> {simpleTask.createdBy}
        </div>
        <div>
          <span className="font-semibold">Created:</span>{' '}
          {formatDate(simpleTask.createdAt)}
        </div>
      </div>
    </div>
  )
}
export default TaskCard
