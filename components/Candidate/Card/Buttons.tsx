import React from 'react'
import { BiDetail } from 'react-icons/bi'
import UpdateModal from './UpdateCandidate/UpdateModal'
import { CandidateData } from '@/utils/CandidateInterface'
import UpdateInterviewDateModal from './UpdateCandidate/UpdateInterviewDate'

const Buttons = ({ candidate }: { candidate: CandidateData }) => {
  return (
    <div className="flex mt-4 items-center gap-4 justify-between">
      {/* Edit Candidate Button */}
      <UpdateModal candidate={candidate} />
      {/* Update Interview Date Button */}
      <UpdateInterviewDateModal
        Interviewdate={candidate.InterviewDate ? candidate.InterviewDate : ''}
      />
      {/* View Details Button */}
      <button className="flex items-center text-xs gap-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-full shadow-lg hover:bg-green-600 transition transform hover:scale-105 w-full sm:w-auto group">
        <BiDetail size={20} />
        <span className="hidden group-hover:inline-block text-sm ml-2">
          View Details
        </span>
      </button>
    </div>
  )
}

export default Buttons
