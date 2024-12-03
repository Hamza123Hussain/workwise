import React from 'react'
import { FaCalendarAlt, FaInfoCircle, FaUserEdit } from 'react-icons/fa'
const Buttons = ({ InterviewDate }: { InterviewDate: Date }) => {
  return (
    <div className="mt-6 flex sm:flex-row flex-col justify-center items-center gap-4">
      {/* Schedule Interview Button */}
      <button
        className="flex items-center text-xs text-nowrap gap-2 px-2 py-2 bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-blue-600 transition transform hover:scale-105"
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
        className="flex items-center text-xs text-nowrap gap-2 px-2 py-2 bg-green-500 text-white font-semibold rounded-full shadow-lg hover:bg-green-600 transition transform hover:scale-105"
        onClick={() => console.log('Showing all details')}
      >
        <FaInfoCircle /> Show All Details
      </button>
      {/* Update Candidate Button */}
      <button
        className="flex items-center text-xs text-nowrap gap-2 px-2 py-2 bg-purple-500 text-white font-semibold rounded-full shadow-lg hover:bg-purple-600 transition transform hover:scale-105"
        onClick={() => console.log('Updating candidate details')}
      >
        <FaUserEdit /> Update Candidate
      </button>
    </div>
  )
}
export default Buttons
