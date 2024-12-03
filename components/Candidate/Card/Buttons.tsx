import React from 'react'
import { FaCalendarAlt, FaInfoCircle } from 'react-icons/fa'

const Buttons = ({ InterviewDate }: { InterviewDate: Date }) => {
  return (
    <div className="mt-6 flex sm:flex-row flex-col justify-center items-center gap-4">
      {/* Schedule Interview Button */}
      <button
        className="flex items-center text-xs text-nowrap gap-2 px-6 py-2 bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:from-teal-500 hover:to-blue-600 transition transform hover:scale-105"
        onClick={() =>
          console.log(
            `Scheduled Interview on ${InterviewDate.toLocaleDateString()}`
          )
        }
      >
        <FaCalendarAlt /> Schedule Interview
      </button>

      {/* Show All Details Button */}
      <button
        className="flex items-center text-xs text-nowrap  gap-2 px-6 py-2 bg-green-400 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:from-green-500 hover:to-purple-600 transition transform hover:scale-105"
        onClick={() => console.log('Showing all details')}
      >
        <FaInfoCircle /> Show All Details
      </button>
    </div>
  )
}

export default Buttons
