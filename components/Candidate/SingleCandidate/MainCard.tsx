import React from 'react'
import {
  FaPhone,
  FaLinkedin,
  FaCalendarAlt,
  FaDollarSign,
  FaLocationArrow,
  FaTag,
} from 'react-icons/fa'

const CandidateDetails = ({
  candidate,
}: {
  candidate: {
    Name: string
    Age: number
    Email: string
    Phone: string | null | undefined
    LinkedInProfile: string | null | undefined
    Position: string
    Qualification: string | null | undefined
    ExpectedSalary: number | null | undefined
    CurrentSalary: number | null | undefined
    Address: string | null | undefined
    Progress: string
    InterviewDate: Date | null | undefined
    InterviewFeedback: string | null | undefined
    Rating: number | null | undefined
    Notes:
      | {
          Comment: string
          AddedBy: { Name: string; Email: string }
          AddedAt: Date
        }[]
      | null
      | undefined
    Tags: string[] | null | undefined
    Resume: string | null | undefined
    Source: string
    IsActive: boolean
    ReferrerName: string | null | undefined
    ReferrerEmail: string | null | undefined
    LastContacted: Date | null | undefined
    ApplicationDate: Date | null | undefined
  }
}) => {
  return (
    <div className="p-6 sm:p-8 bg-white rounded-lg shadow-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Personal Information Section */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">
            Personal Information
          </h3>
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              <strong>Name:</strong> {candidate.Name ?? 'N/A'}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Age:</strong> {candidate.Age ?? 'N/A'}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Email:</strong> {candidate.Email ?? 'N/A'}
            </p>
            <p className="text-sm text-gray-600">
              <FaPhone className="inline-block mr-2" />
              <strong>Phone:</strong> {candidate.Phone ?? 'N/A'}
            </p>
            <p className="text-sm text-gray-600">
              <FaLinkedin className="inline-block mr-2" />
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
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">
            Job Information
          </h3>
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              <strong>Position:</strong> {candidate.Position ?? 'N/A'}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Qualification:</strong> {candidate.Qualification ?? 'N/A'}
            </p>
            <p className="text-sm text-gray-600">
              <FaDollarSign className="inline-block mr-2" />
              <strong>Expected Salary:</strong> $
              {candidate.ExpectedSalary ?? 'N/A'}
            </p>
            <p className="text-sm text-gray-600">
              <FaDollarSign className="inline-block mr-2" />
              <strong>Current Salary:</strong> $
              {candidate.CurrentSalary ?? 'N/A'}
            </p>
            <p className="text-sm text-gray-600">
              <FaLocationArrow className="inline-block mr-2" />
              <strong>Address:</strong> {candidate.Address ?? 'N/A'}
            </p>
          </div>
        </div>

        {/* Interview and Offer Details Section */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">
            Interview & Offer Details
          </h3>
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              <FaCalendarAlt className="inline-block mr-2" />
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
          </div>
        </div>

        {/* Tags & Notes Section */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">Tags & Notes</h3>
          <div className="mt-4">
            <div>
              <p className="text-sm text-gray-600">
                <FaTag className="inline-block mr-2" />
                <strong>Tags:</strong>{' '}
                {candidate.Tags?.length ? candidate.Tags.join(', ') : 'No tags'}
              </p>
            </div>
            <div className="mt-2">
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

        {/* Additional Information Section */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md col-span-1 sm:col-span-2 lg:col-span-3">
          <h3 className="text-xl font-semibold text-gray-800">
            Additional Information
          </h3>
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              <strong>Resume:</strong>{' '}
              {candidate.Resume ? (
                <a
                  href={candidate.Resume}
                  className="text-blue-500 hover:underline"
                >
                  View Resume
                </a>
              ) : (
                'No resume uploaded'
              )}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Source:</strong> {candidate.Source ?? 'N/A'}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Referrer:</strong> {candidate.ReferrerName ?? 'N/A'} (
              {candidate.ReferrerEmail ?? 'N/A'})
            </p>
            <p className="text-sm text-gray-600">
              <strong>Last Contacted:</strong>{' '}
              {candidate.LastContacted
                ? new Date(candidate.LastContacted).toLocaleDateString()
                : 'N/A'}
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
    </div>
  )
}

export default CandidateDetails
