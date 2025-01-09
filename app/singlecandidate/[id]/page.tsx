'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  FaPhone,
  FaLinkedin,
  FaCalendarAlt,
  FaDollarSign,
  FaLocationArrow,
  FaTag,
} from 'react-icons/fa'
import { CandidateData } from '@/utils/Interfaces/CandidateInterface'
import { useParams } from 'next/navigation'
import { ApiUrl } from '@/utils/AttendanceInterface'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'

const CandidateDetails = () => {
  const { id } = useParams<{ id: string }>()
  const [candidate, setCandidate] = useState<CandidateData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const User = useSelector((state: RootState) => state.user)

  useEffect(() => {
    // Fetch candidate details
    const fetchCandidate = async () => {
      try {
        const response = await axios.get(
          `${ApiUrl}Api/Candidate/GetASingleCandidate?_id=${id}&Email=${User.Email}`
        )
        if (response.status === 200) {
          setCandidate(response.data)
          setLoading(false)
        } else {
          setError('Candidate not found.')
          setLoading(false)
        }
      } catch (error) {
        setError(`Error fetching candidate details: ${error}`)
        setLoading(false)
      }
    }
    fetchCandidate()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl font-semibold text-gray-700">Loading...</div>
      </div>
    )
  }
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl font-semibold text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="p-6 sm:p-8 bg-gray-200  shadow-lg">
      {candidate && (
        <div className="space-y-6">
          {/* Card Header with Image, Name, Profession, Age, and Current Salary */}
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-6">
            <div className="flex-shrink-0">
              <img
                src={candidate.ImageUrl ?? '/default-avatar.png'}
                alt={candidate.Name}
                className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-800">
                {candidate.Name}
              </h2>
              <p className="text-sm text-gray-500">
                {candidate.Position ?? 'N/A'}
              </p>
              <p className="text-sm text-gray-600">
                Age: {candidate.Age ?? 'N/A'}
              </p>
              <p className="text-sm text-gray-600">
                <FaDollarSign className="inline-block mr-2 text-teal-500" />
                Current Salary: ${candidate.CurrentSalary ?? 'N/A'}
              </p>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">
              Personal Information
            </h3>
            <div className="mt-4 space-y-3">
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> {candidate.Email ?? 'N/A'}
              </p>
              <p className="text-sm text-gray-600">
                <FaPhone className="inline-block mr-2 text-green-500" />
                <strong>Phone:</strong> {candidate.Phone ?? 'N/A'}
              </p>
              <p className="text-sm text-gray-600">
                <FaLinkedin className="inline-block mr-2 text-blue-700" />
                <strong>LinkedIn:</strong>{' '}
                {candidate.LinkedInProfile ? (
                  <a
                    href={candidate.LinkedInProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {candidate.LinkedInProfile}
                  </a>
                ) : (
                  'N/A'
                )}
              </p>
            </div>
          </div>

          {/* Job Information Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">
              Job Information
            </h3>
            <div className="mt-4 space-y-3">
              <p className="text-sm text-gray-600">
                <strong>Position:</strong> {candidate.Position ?? 'N/A'}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Qualification:</strong>{' '}
                {candidate.Qualification ?? 'N/A'}
              </p>
              <p className="text-sm text-gray-600">
                <FaDollarSign className="inline-block mr-2 text-teal-500" />
                <strong>Expected Salary:</strong> $
                {candidate.ExpectedSalary ?? 'N/A'}
              </p>
              <p className="text-sm text-gray-600">
                <FaLocationArrow className="inline-block mr-2 text-red-500" />
                <strong>Address:</strong> {candidate.Address ?? 'N/A'}
              </p>
            </div>
          </div>

          {/* Interview and Offer Details Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">
              Interview & Offer Details
            </h3>
            <div className="mt-4 space-y-3">
              <p className="text-sm text-gray-600">
                <FaCalendarAlt className="inline-block mr-2 text-yellow-500" />
                <strong>Interview Date:</strong>{' '}
                {candidate.InterviewDate
                  ? new Date(candidate.InterviewDate).toLocaleDateString()
                  : 'N/A'}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Interview Feedback:</strong>{' '}
                {candidate.InterviewFeedback ?? 'N/A'}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Progress:</strong> {candidate.Progress ?? 'N/A'}
              </p>
              {candidate.RejectionReason && (
                <p className="text-sm text-red-600">
                  <strong>Rejection Reason:</strong>{' '}
                  {candidate.RejectionReason ?? 'N/A'}
                </p>
              )}
              {candidate.OfferDetails && (
                <div>
                  <p className="text-sm text-gray-600">
                    <strong>Offered Salary:</strong> $
                    {candidate.OfferDetails.OfferedSalary ?? 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Joining Date:</strong>{' '}
                    {candidate.OfferDetails.JoiningDate
                      ? new Date(
                          candidate.OfferDetails.JoiningDate
                        ).toLocaleDateString()
                      : 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Offer Status:</strong>{' '}
                    {candidate.OfferDetails.Status ?? 'N/A'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Tags & Notes Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">
              Tags & Notes
            </h3>
            <div className="mt-4 space-y-3">
              <p className="text-sm text-gray-600">
                <FaTag className="inline-block mr-2 text-purple-600" />
                <strong>Tags:</strong>{' '}
                {candidate.Tags?.length ? candidate.Tags.join(', ') : 'No tags'}
              </p>
              <div>
                <strong>Notes:</strong>
                {candidate.Notes?.length ? (
                  <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
                    {candidate.Notes.map((note, index) => (
                      <li key={index}>
                        <p>
                          <strong>{note.AddedBy.Name}:</strong>{' '}
                          {note.Comment ?? 'N/A'}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(note.AddedAt).toLocaleDateString()}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-600">No notes available.</p>
                )}
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">
              Additional Information
            </h3>
            <div className="mt-4 space-y-3">
              <p className="text-sm text-gray-600">
                <strong>Resume:</strong>{' '}
                {candidate.Resume ? (
                  <a
                    href={candidate.Resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Resume
                  </a>
                ) : (
                  'N/A'
                )}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Source:</strong> {candidate.Source ?? 'N/A'}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Updated By:</strong> {candidate.UpdatedBy ?? 'N/A'}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Status:</strong>{' '}
                {candidate.IsActive ? 'Active' : 'Inactive'}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Referral:</strong>{' '}
                {candidate.ReferralDetails?.ReferrerName
                  ? `${candidate.ReferralDetails.ReferrerName} (${candidate.ReferralDetails.ReferrerEmail})`
                  : 'N/A'}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Last Contacted:</strong>{' '}
                {candidate.LastContacted ?? 'N/A'}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Application Date:</strong>{' '}
                {candidate.ApplicationDate
                  ? new Date(candidate.ApplicationDate).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CandidateDetails
