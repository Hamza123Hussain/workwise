import { CandidateData } from '@/utils/Interfaces/CandidateInterface'

interface ProgressSelectorProps {
  progress: string
  setCandidateData: React.Dispatch<React.SetStateAction<CandidateData>>
}

const ProgressSelector: React.FC<ProgressSelectorProps> = ({
  progress,
  setCandidateData,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium">Progress</label>
      <select
        className="w-full p-2 border rounded"
        value={progress}
        onChange={(e) =>
          setCandidateData((prevData) => ({
            ...prevData,
            progress: e.target.value,
          }))
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
  )
}

export default ProgressSelector
