import { CandidateData } from '@/utils/CandidateInterface'

interface InterviewFeedbackProps {
  interviewFeedback: string
  setCandidateData: React.Dispatch<React.SetStateAction<CandidateData>>
}

const InterviewFeedback: React.FC<InterviewFeedbackProps> = ({
  interviewFeedback,
  setCandidateData,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium">Interview Feedback</label>
      <textarea
        className="w-full p-2 border rounded"
        value={interviewFeedback}
        onChange={(e) =>
          setCandidateData((prevData) => ({
            ...prevData,
            interviewFeedback: e.target.value,
          }))
        }
      />
    </div>
  )
}

export default InterviewFeedback
