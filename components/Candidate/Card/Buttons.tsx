import React from 'react'
import { FaCalendarAlt } from 'react-icons/fa'
import { BiDetail } from 'react-icons/bi'
import UpdateModal from './UpdateCandidate/UpdateModal'

const Buttons = ({ InterviewDate }: { InterviewDate: Date }) => {
  return (
    <div className="flex mt-4 flex-col items-center gap-4">
      <button
        className="flex items-center text-xs text-nowrap gap-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-blue-600 transition transform hover:scale-105 w-full sm:w-auto"
        onClick={() =>
          console.log(
            `Scheduled Interview on ${InterviewDate.toLocaleDateString()}`
          )
        }
      >
        <FaCalendarAlt size={20} />
        <span className="hidden sm:inline">Scheduled Interview</span>
      </button>
      <button
        className="flex items-center text-xs text-nowrap gap-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-full shadow-lg hover:bg-green-600 transition transform hover:scale-105 w-full sm:w-auto"
        onClick={() => console.log('Showing all details')}
      >
        <BiDetail size={20} />
        <span className="hidden sm:inline">View Details</span>
      </button>
      <UpdateModal />
    </div>
  )
}

export default Buttons
