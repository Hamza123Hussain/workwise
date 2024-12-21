import React from 'react'

import InputField from './Input'
interface PersonalDetailsSectionProps {
  Name: string
  Age: number
  Email: string
  Phone: string
  HandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const PersonalDetailsSection: React.FC<PersonalDetailsSectionProps> = ({
  Name,
  Age,
  Email,
  Phone,
  HandleChange,
}) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Personal Details</h3>
      <InputField
        label="Name"
        id="Name"
        name="Name"
        value={Name}
        onChange={HandleChange}
        type="text"
        placeholder="Enter your name"
      />
      <InputField
        label="Age"
        id="Age"
        name="Age"
        value={Age}
        onChange={HandleChange}
        type="number"
        placeholder="Enter your age"
      />
      <InputField
        label="Email"
        id="Email"
        name="Email"
        value={Email}
        onChange={HandleChange}
        type="email"
        placeholder="Enter your email"
      />
      <InputField
        label="Phone"
        id="Phone"
        name="Phone"
        value={Phone}
        onChange={HandleChange}
        type="tel"
        placeholder="Enter phone number"
      />
    </div>
  )
}

export default PersonalDetailsSection
