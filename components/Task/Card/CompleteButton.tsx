import React from 'react'
// import { FaCheckCircle } from 'react-icons/fa'

const CompleteButton = ({ Completed }: { Completed: boolean }) => {
  return (
    <>
      {/* <div className="flex items-center mb-6">
        <FaCheckCircle
          className={`mr-2 text-xl ${
            Completed ? 'text-green-500' : 'text-gray-500'
          }`} // Icon color for completion status
        />
        <span className="text-lg">
          {Completed ? 'Task Completed' : 'Task Not Completed'}
        </span>
      </div> */}
      <button
        className={`w-full py-3 font-semibold text-lg ${
          Completed
            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
        disabled={Completed}
        onClick={() => alert('Task marked as complete!')}
      >
        {Completed ? 'Completed' : 'Mark as Complete'}
      </button>
    </>
  )
}

export default CompleteButton
