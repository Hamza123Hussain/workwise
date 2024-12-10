import { CandidateData } from '@/utils/CandidateInterface'
import React from 'react'

const OfferDetails = ({
  offerDetails,
  setCandidateData,
}: {
  offerDetails: { offeredSalary: number; joiningDate: string; status: string }
  setCandidateData: React.Dispatch<React.SetStateAction<CandidateData>>
}) => {
  return (
    <div>
      <label className="block text-sm font-medium">Offered Salary</label>
      <input
        type="number"
        className="w-full p-2 border rounded"
        value={offerDetails.offeredSalary}
        onChange={(e) =>
          setCandidateData((prevData) => ({
            ...prevData,
            offerDetails: {
              ...prevData.OfferDetails,
              offeredSalary: +e.target.value,
            },
          }))
        }
      />
    </div>
  )
}

export default OfferDetails
