import React from 'react'
import InputField from './Input'

interface ProfessionalDetailsSectionProps {
  HandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  Position: string
  Qualification: string
  Portfolio: string
  ExpectedSalary: number
  CurrentSalary: number
  linkedInProfile: string
}

const ProfessionalDetailsSection: React.FC<ProfessionalDetailsSectionProps> = ({
  Position,
  Qualification,
  Portfolio,
  ExpectedSalary,
  CurrentSalary,
  HandleChange,
  linkedInProfile,
}) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Professional Details</h3>
      <InputField
        label="Position"
        id="Position"
        name="Position"
        value={Position}
        onChange={HandleChange}
        type="text"
        placeholder="Enter desired position"
      />
      <InputField
        label="Qualification"
        id="Qualification"
        name="Qualification"
        value={Qualification}
        onChange={HandleChange}
        type="text"
        placeholder="Enter qualification"
      />
      <InputField
        label="Portfolio"
        id="Portfolio"
        name="Portfolio"
        value={Portfolio}
        onChange={HandleChange}
        type="text"
        placeholder="Enter portfolio URL"
      />
      <InputField
        label="linkedInProfile"
        id="linkedInProfile"
        name="linkedInProfile"
        value={linkedInProfile}
        onChange={HandleChange}
        type="text"
        placeholder="Enter linkedInProfile URL"
      />
      <InputField
        label="Expected Salary"
        id="ExpectedSalary"
        name="ExpectedSalary"
        value={ExpectedSalary}
        onChange={HandleChange}
        type="number"
        placeholder="Enter expected salary"
      />
      <InputField
        label="Current Salary"
        id="CurrentSalary"
        name="CurrentSalary"
        value={CurrentSalary}
        onChange={HandleChange}
        type="number"
        placeholder="Enter current salary"
      />
    </div>
  )
}

export default ProfessionalDetailsSection
