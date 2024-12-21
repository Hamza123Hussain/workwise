import React from 'react'
import ReferralDetailsInput from './RefferalInput'
import { ReferralDetails } from '@/utils/CandidateInterface'

interface ReferralSectionProps {
  ReferralDetails: ReferralDetails
  HandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ReferralSection: React.FC<ReferralSectionProps> = ({
  ReferralDetails,
  HandleChange,
}) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Referral Details</h3>
      <ReferralDetailsInput
        label="Referrer Name"
        id="ReferralDetails.ReferrerName"
        name="ReferralDetails.ReferrerName"
        value={ReferralDetails.ReferrerName}
        onChange={HandleChange}
        placeholder="Enter referrer name"
      />
      <ReferralDetailsInput
        label="Referrer Email"
        id="ReferralDetails.ReferrerEmail"
        name="ReferralDetails.ReferrerEmail"
        value={ReferralDetails.ReferrerEmail}
        onChange={HandleChange}
        placeholder="Enter referrer email"
      />
    </div>
  )
}

export default ReferralSection
