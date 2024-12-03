import React from 'react'
import { FaCalendarAlt } from 'react-icons/fa'

const InterviewShow = ({ InterviewDate }: { InterviewDate: Date }) => {
  return (
    <p className="flex items-center gap-2">
      <FaCalendarAlt className="text-blue-600" /> Interview Date:{' '}
      {new Date(InterviewDate).toLocaleDateString()}
    </p>
  )
}

export default InterviewShow
