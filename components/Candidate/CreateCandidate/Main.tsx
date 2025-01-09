import { createCandidate } from '@/functions/Candidates/Candidate_Creation'
import { CreateCandidateData } from '@/utils/Interfaces/CandidateInterface'
import React, { useState } from 'react'
import PersonalDetailsSection from './PersonalDetails'
import ProfessionalDetailsSection from './ProfessionalDetails'
import ReferralSection from './RefferalDetails'
const Main = () => {
  const [CandidateData, SetCandidateData] = useState<CreateCandidateData>({
    Resume: '',
    Age: 0,
    Name: '',
    Email: '',
    Phone: '',
    LinkedInProfile: '',
    ImageUrl: '',
    Portfolio: '',
    Position: '',
    Qualification: '',
    ExpectedSalary: 0,
    CurrentSalary: 0,
    Address: '',
    ReferralDetails: { ReferrerName: '', ReferrerEmail: '' },
  })
  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name.startsWith('ReferralDetails')) {
      const key = name.split('.')[1]
      SetCandidateData((prevData) => ({
        ...prevData,
        ReferralDetails: {
          ...prevData.ReferralDetails,
          [key]: value,
        },
      }))
    } else {
      SetCandidateData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  }
  return (
    <div className=" h-[90vh] overflow-y-auto w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Candidate Form
      </h2>
      {/* Personal Details Section */}
      <PersonalDetailsSection
        Name={CandidateData.Name}
        Age={CandidateData.Age}
        Email={CandidateData.Email}
        Phone={CandidateData.Phone}
        Address={CandidateData.Address}
        HandleChange={HandleChange}
      />
      {/* Professional Details Section */}
      <ProfessionalDetailsSection
        Position={CandidateData.Position}
        Portfolio={CandidateData.Portfolio}
        linkedInProfile={CandidateData.LinkedInProfile}
        ExpectedSalary={CandidateData.ExpectedSalary}
        CurrentSalary={CandidateData.CurrentSalary}
        Qualification={CandidateData.Qualification}
        HandleChange={HandleChange}
      />
      {/* Referral Section */}
      <ReferralSection
        ReferralDetails={CandidateData.ReferralDetails}
        HandleChange={HandleChange}
      />
      <div className="flex justify-center mt-6">
        <button
          onClick={() => createCandidate(CandidateData)}
          className="w-full sm:w-auto bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </div>
    </div>
  )
}
export default Main
