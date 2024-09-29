import React from 'react'

const TaskStatus = () => {
  return (
    <div className="bg-white flex-1 p-6 rounded-lg shadow-md">
      <div className="mt-6">
        <p>
          <strong>Total Tasks Assigned:</strong>{' '}
          <span className="font-bold">50</span>
        </p>
        <p>
          <strong>Tasks Done:</strong> <span className="font-bold">30</span>
        </p>
        <p>
          <strong>Tasks Left:</strong> <span className="font-bold">20</span>
        </p>
      </div>
    </div>
  )
}

export default TaskStatus
