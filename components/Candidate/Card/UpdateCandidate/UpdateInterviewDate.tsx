import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FaCalendarAlt } from 'react-icons/fa'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'

const UpdateInterviewDateModal = ({
  Interviewdate,
  candidateId, // Add candidateId to uniquely identify the candidate
}: {
  Interviewdate: Date | string
  candidateId: string
}) => {
  // Initialize the InterviewDate state, or set it to an empty string if not available
  const [InterviewDate, setInterviewDate] = useState<string>(
    Interviewdate ? Interviewdate.toString() : ''
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const User = useSelector((state: RootState) => state.user)
  // Handle the change of InterviewDate
  const handleInterviewDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInterviewDate(e.target.value)
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)

    try {
      // Prepare the updated user data
      const UserData = {
        InterviewDate, // Include InterviewDate in UserData
      }

      // Send the request to the backend to update the candidate
      const response = await axios.put(
        `${ApiUrl}Api/Candidate/UpdateACandidate`,
        {
          _id: candidateId, // Include candidateId in the request
          UserData,
          Email: User.Email,
        }
      )

      if (response.status === 200) {
        // Handle successful response
        alert('Interview Date updated successfully!')
      }
    } catch (err) {
      setError(`Error updating interview date. Please try again later.${err}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center text-xs gap-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-blue-600 transition transform hover:scale-105 w-full sm:w-auto group">
          <FaCalendarAlt size={20} />
          <span className="hidden group-hover:inline-block text-sm ml-2">
            Schedule Interview
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] w-full mx-auto h-[50vh] overflow-auto p-6 bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Edit Interview Date
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Interview Date */}
          <div>
            <label
              htmlFor="InterviewDate"
              className="block text-sm font-medium text-gray-700"
            >
              Interview Date
            </label>
            <input
              type="date"
              id="InterviewDate"
              name="InterviewDate"
              value={InterviewDate} // Set InterviewDate value, if none set to empty string
              onChange={handleInterviewDateChange}
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

export default UpdateInterviewDateModal
