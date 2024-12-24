import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FaEdit } from 'react-icons/fa'
import { CandidateData } from '@/utils/CandidateInterface'
import axios from 'axios'
import { ApiUrl } from '@/utils/AttendanceInterface'
import { RootState } from '@/utils/Redux/Store/Store'
import { useSelector } from 'react-redux'

const UpdateModal = ({ candidate }: { candidate: CandidateData }) => {
  const User = useSelector((state: RootState) => state.user)
  const [formData, setFormData] = useState(candidate)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleOfferDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      OfferDetails: {
        ...prev.OfferDetails,
        [name]: value,
      },
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.put(
        `${ApiUrl}Api/Candidate/UpdateACandidate`,
        {
          _id: candidate._id,
          UserData: formData,
          Email: User.Email,
        }
      )

      if (response.status === 200) {
        // Handle successful response (e.g., show success message, close modal)
        alert('Candidate updated successfully!')
      }
    } catch (err) {
      setError(`Error updating candidate. Please try again later. ${err}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center text-xs gap-2 px-4 py-2 bg-blue-300 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105 w-full sm:w-auto group">
          <FaEdit size={20} />
          <span className="hidden group-hover:inline-block text-sm ml-2">
            Edit Candidate
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] w-full mx-auto h-[90vh] overflow-auto p-6 bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Edit Candidate
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Last Contacted */}
          <div>
            <label
              htmlFor="LastContacted"
              className="block text-sm font-medium text-gray-700"
            >
              Last Contacted
            </label>
            <input
              type="date"
              id="LastContacted"
              name="LastContacted"
              value={formData.LastContacted?.toString().split('T')[0] || ''}
              onChange={handleInputChange}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Progress */}
          <div>
            <label
              htmlFor="Progress"
              className="block text-sm font-medium text-gray-700"
            >
              Progress
            </label>
            <select
              id="Progress"
              name="Progress"
              value={formData.Progress}
              onChange={handleInputChange}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="NotNeeded">Not Needed</option>
              <option value="Interviewed">Interviewed</option>
              <option value="Hired">Hired</option>
              <option value="Called">Called</option>
              <option value="Offered">Offered</option>
              <option value="New">New</option>
            </select>
          </div>

          {/* Offered Salary */}
          <div>
            <label
              htmlFor="OfferedSalary"
              className="block text-sm font-medium text-gray-700"
            >
              Offered Salary
            </label>
            <input
              type="number"
              id="OfferedSalary"
              name="OfferedSalary"
              value={formData.OfferDetails?.OfferedSalary || ''}
              onChange={handleOfferDetailsChange}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Joining Date */}
          <div>
            <label
              htmlFor="JoiningDate"
              className="block text-sm font-medium text-gray-700"
            >
              Joining Date
            </label>
            <input
              type="date"
              id="JoiningDate"
              name="JoiningDate"
              value={
                formData.OfferDetails?.JoiningDate
                  ? formData.OfferDetails.JoiningDate.toString().split('T')[0]
                  : ''
              }
              onChange={handleOfferDetailsChange}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="Status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="Status"
              name="Status"
              value={formData.OfferDetails?.Status}
              onChange={handleOfferDetailsChange}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Interview Feedback */}
          <div>
            <label
              htmlFor="InterviewFeedback"
              className="block text-sm font-medium text-gray-700"
            >
              Interview Feedback
            </label>
            <textarea
              id="InterviewFeedback"
              name="InterviewFeedback"
              value={formData.InterviewFeedback || ''}
              onChange={handleInputChange}
              rows={4}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateModal
