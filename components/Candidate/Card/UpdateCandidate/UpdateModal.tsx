import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { CandidateData } from '@/utils/CandidateInterface'
import { FaEdit } from 'react-icons/fa'

const UpdateModal = () => {
  // Mock candidate data
  const [candidateData, setCandidateData] = useState<CandidateData>({
    _id: '12345', // Unique ID (could be fetched from DB or generated)
    Name: 'John Doe',
    Age: 30, // Example age
    Email: 'john.doe@example.com',
    Phone: '123-456-7890',
    LinkedInProfile: 'https://www.linkedin.com/in/johndoe',
    ImageUrl: 'https://www.example.com/johndoe.jpg', // URL to profile image
    Portfolio: 'https://www.johndoeportfolio.com', // Portfolio URL
    Position: 'Software Engineer',
    Qualification: 'BSc Computer Science', // Example qualification
    ExpectedSalary: 85000,
    CurrentSalary: 75000,
    Address: '123 Main St, City, Country',
    Progress: 'Interviewed',
    RejectionReason: null, // Set null for no rejection reason
    OfferDetails: {
      OfferedSalary: 75000,
      JoiningDate: new Date(),
      Status: 'Pending',
    },
    Tags: ['JavaScript', 'React', 'Node.js'], // Example tags
    InterviewDate: new Date('2024-12-20'),
    InterviewFeedback: 'Strong technical skills.',
    Rating: 4,
    Notes: [
      {
        Comment: 'Excellent communication skills.',
        AddedBy: {
          Name: 'Jane Smith',
          Email: 'jane.smith@example.com',
        },
        AddedAt: new Date(),
      },
    ],
    Resume: 'https://www.example.com/johndoe-resume.pdf', // URL to resume
    Source: 'LinkedIn',
    UpdatedBy: 'Admin',
    IsActive: true,
    ReferralDetails: {
      ReferrerName: 'Hamza',
      ReferrerEmail: 'hamza@example.com',
    },
    LastContacted: '2024-01-15',
    ApplicationDate: new Date('2024-01-01'),
    StatusHistory: [
      {
        Status: 'Applied',
        UpdatedAt: new Date(),
        UpdatedBy: '',
      },
    ],
  })
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="btn-primary flex items-center gap-2 bg-white rounded-lg my-1 p-2">
          <FaEdit size={20} />
          <h1>Edit Candidate</h1>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-[90vh] overflow-auto rounded-md shadow-lg">
        <DialogHeader>
          <DialogTitle>Edit Candidate</DialogTitle>
        </DialogHeader>
        <div className="p-4 space-y-4">
          <div className="form-group">
            <label>Last Contacted</label>
            <input
              type="date"
              value={candidateData.LastContacted} // Expecting a string in YYYY-MM-DD format
              className="form-control"
            />
          </div>
          {/* Progress */}
          <div>
            <label className="block text-sm font-medium">Progress</label>
            <select
              className="w-full p-2 border rounded"
              value={candidateData.Progress}
              onChange={(e) =>
                setCandidateData({ ...candidateData, Progress: e.target.value })
              }
            >
              <option value="NotNeeded">Not Needed</option>
              <option value="Interviewed">Interviewed</option>
              <option value="Hired">Hired</option>
              <option value="Called">Called</option>
              <option value="Offered">Offered</option>
              <option value="New">New</option>
            </select>
          </div>
          <div className="form-group">
            {candidateData.ReferralDetails && (
              <>
                <label>Referrer Name</label>
                <input
                  type="text"
                  value={candidateData.ReferralDetails.ReferrerName}
                  onChange={(e) =>
                    setCandidateData({
                      ...candidateData,
                      ReferralDetails: {
                        ReferrerName: e.target.value,
                        ReferrerEmail: candidateData.ReferralDetails
                          ?.ReferrerEmail
                          ? candidateData.ReferralDetails.ReferrerEmail
                          : '',
                      },
                    })
                  }
                  className="form-control"
                />
              </>
            )}
          </div>
          <div className="form-group">
            {candidateData.ReferralDetails && (
              <>
                <label>Referrer Email</label>
                <input
                  type="email"
                  value={candidateData.ReferralDetails.ReferrerEmail}
                  onChange={(e) =>
                    setCandidateData({
                      ...candidateData,
                      ReferralDetails: {
                        ReferrerName: candidateData.ReferralDetails
                          ?.ReferrerName
                          ? candidateData.ReferralDetails.ReferrerName
                          : '',
                        ReferrerEmail: e.target.value,
                      },
                    })
                  }
                  className="form-control"
                />
              </>
            )}
          </div>
          {/* Offer Details */}
          <div>
            <label className="block text-sm font-medium">Offered Salary</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={candidateData.OfferDetails.OfferedSalary}
              onChange={(e) =>
                setCandidateData({
                  ...candidateData,
                  OfferDetails: {
                    ...candidateData.OfferDetails,
                    OfferedSalary: +e.target.value,
                  },
                })
              }
            />
          </div>
          {/* Interview Feedback */}
          <div>
            <label className="block text-sm font-medium">
              Interview Feedback
            </label>
            <textarea
              className="w-full p-2 border rounded"
              value={
                candidateData.InterviewFeedback
                  ? candidateData.InterviewFeedback
                  : ''
              }
              onChange={(e) =>
                setCandidateData({
                  ...candidateData,
                  InterviewFeedback: e.target.value,
                })
              }
            />
          </div>
          {/* Notes */}
          <div>
            <label className="block text-sm font-medium">Notes</label>
            {candidateData.Notes.map((note, index) => (
              <div key={index} className="p-2 border rounded mb-2">
                <p>
                  <strong>Comment:</strong> {note.Comment}
                </p>
                <p>
                  <strong>Added By:</strong> {note.AddedBy.Name} (
                  {note.AddedBy.Email})
                </p>
                <p>
                  <strong>Added At:</strong>{' '}
                  {new Date(note.AddedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default UpdateModal
