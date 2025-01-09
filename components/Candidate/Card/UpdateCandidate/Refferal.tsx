import {
  CandidateData,
  ReferralDetails,
} from '@/utils/Interfaces/CandidateInterface'

interface ReferralDetailsProps {
  refDetails: ReferralDetails
  setCandidateData: React.Dispatch<React.SetStateAction<CandidateData>>
}

const RefDetails: React.FC<ReferralDetailsProps> = ({
  refDetails,
  setCandidateData,
}) => {
  return (
    <div>
      <div className="form-group">
        <label>Referrer Name</label>
        <input
          type="text"
          value={refDetails.ReferrerName}
          onChange={(e) =>
            setCandidateData((prevData) => ({
              ...prevData,
              refDetails: {
                ...prevData.ReferralDetails,
                ReferrerName: e.target.value,
              },
            }))
          }
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Referrer Email</label>
        <input
          type="email"
          value={refDetails.ReferrerEmail}
          onChange={(e) =>
            setCandidateData((prevData) => ({
              ...prevData,
              refDetails: {
                ...prevData.ReferralDetails,
                ReferrerEmail: e.target.value,
              },
            }))
          }
          className="form-control"
        />
      </div>
    </div>
  )
}

export default RefDetails
