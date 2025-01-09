import { CandidateData } from '@/utils/Interfaces/CandidateInterface'
import Image from 'next/image'
import React from 'react'
import { FaEnvelope, FaPhone, FaDollarSign, FaUserTie } from 'react-icons/fa'
import RatingCard from './RatingCard'
import ProgressCard from './ProgressCard'
import InterviewShow from './InterviewDate'
import Links from './Links'
import Buttons from './Buttons'

const CandidateCard = ({ candidate }: { candidate: CandidateData }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transition transform hover:scale-105 hover:shadow-2xl p-6">
      {/* Candidate Header */}
      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Candidate Image */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 relative">
          <Image
            src={
              candidate.ImageUrl
                ? candidate.ImageUrl
                : 'https://dummy.xtemos.com/woodmart-elementor/demos/wp-content/uploads/sites/2/2017/06/wood-blog-placeholder.jpg'
            }
            alt={candidate.Name}
            className="rounded-full object-cover border-4 border-blue-500"
            layout="fill"
          />
        </div>
        {/* Candidate Details */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <h2 className="text-2xl font-semibold text-gray-800">
            {candidate.Name}
          </h2>
          <p className="text-sm text-gray-600">{candidate.Position}</p>
          <div className="mt-3 flex gap-4">
            <p className="flex items-center text-gray-700 gap-1">
              <FaUserTie className="text-indigo-600" /> Age: {candidate.Age}
            </p>
            <p className="flex items-center text-gray-700 gap-1">
              <FaDollarSign className="text-yellow-600" /> Expected:{' '}
              {candidate.ExpectedSalary}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="mt-6  flex flex-col gap-4">
        <div className="flex items-center gap-2 text-gray-700">
          <FaEnvelope className="text-blue-600" />
          <span>{candidate.Email}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <FaPhone className="text-green-600" />
          <span>{candidate.Phone}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <FaDollarSign className="text-yellow-600" />
          <span>Current Salary: {candidate.CurrentSalary}</span>
        </div>
      </div>

      {/* Optional Sections */}
      <div className="mt-6 space-y-4">
        {candidate.InterviewDate && (
          <InterviewShow InterviewDate={candidate.InterviewDate} />
        )}
        {candidate.Rating && candidate.Rating >= 1 && (
          <RatingCard Rating={candidate.Rating} />
        )}
        <ProgressCard Progress={candidate.Progress} />
      </div>

      {/* Portfolio Links */}
      <div className="mt-6">
        <Links
          Portfolio={candidate.Portfolio}
          LinkedInProfile={candidate.LinkedInProfile}
        />
      </div>

      {/* Tags */}
      {candidate.Tags && candidate.Tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {candidate.Tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-500 text-sm px-2 py-1 rounded-full shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-6">
        <Buttons candidate={candidate} />
      </div>
    </div>
  )
}

export default CandidateCard
