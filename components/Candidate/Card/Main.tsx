import { CandidateData } from '@/utils/CandidateInterface'
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
    <div
      key={candidate._id}
      className="bg-gradient-to-br cursor-pointer from-blue-200 to-purple-200 shadow-lg rounded-xl overflow-hidden p-6 transition transform hover:scale-105 hover:shadow-2xl"
    >
      {/* Candidate Image */}
      <div className="flex justify-center mb-4">
        <Image
          src={
            candidate.ImageUrl
              ? candidate.ImageUrl
              : '/https://dummy.xtemos.com/woodmart-elementor/demos/wp-content/uploads/sites/2/2017/06/wood-blog-placeholder.jpg'
          }
          alt={candidate.Name}
          className="rounded-lg border-4 border-teal-500 h-1/3 w-full"
          width={100}
          height={100}
        />
      </div>
      {/* Candidate Details */}
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-1">
        {candidate.Name}
      </h2>
      <p className="text-center text-sm text-gray-600 mb-4">
        {candidate.Position}
      </p>
      {/* Key Details */}
      <div className="text-gray-700 space-y-2">
        <p className="flex items-center gap-2">
          <FaEnvelope className="text-blue-600" /> {candidate.Email}
        </p>
        <p className="flex items-center gap-2">
          <FaPhone className="text-green-600" /> {candidate.Phone}
        </p>
        <p className="flex items-center gap-2">
          <FaUserTie className="text-indigo-600" /> Age: {candidate.Age}
        </p>
        <p className="flex items-center gap-2">
          <FaDollarSign className="text-yellow-600" /> Expected Salary:{' '}
          {candidate.ExpectedSalary}
        </p>
        <p className="flex items-center gap-2">
          <FaDollarSign className="text-yellow-600" /> Current Salary:{' '}
          {candidate.CurrentSalary}
        </p>
        {/* Interview Date */}
        {candidate.InterviewDate && (
          <InterviewShow InterviewDate={candidate.InterviewDate} />
        )}
      </div>
      {/* Rating card */}
      {candidate.Rating && <RatingCard Rating={candidate.Rating} />}
      {/* Progress Status */}
      <ProgressCard Progress={candidate.Progress} />
      {/* Links */}
      <Links
        Portfolio={candidate.Portfolio}
        LinkedInProfile={candidate.LinkedInProfile}
      />
      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {candidate.Tags.map((tag) => (
          <span
            key={tag}
            className="bg-blue-100 text-blue-500 text-sm px-2 py-1 rounded-full shadow"
          >
            {tag}
          </span>
        ))}
      </div>
      {/* Action Button */}
      {candidate.InterviewDate && (
        <Buttons InterviewDate={candidate.InterviewDate} />
      )}
    </div>
  )
}
export default CandidateCard
