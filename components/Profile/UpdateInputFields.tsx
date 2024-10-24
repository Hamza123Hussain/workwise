import { InputValues } from '@/utils/SignUpInterface'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
const UpdateInputFields = ({
  inputVal,
  setInputVal,
}: {
  inputVal: InputValues
  setInputVal: React.Dispatch<React.SetStateAction<InputValues>>
}) => {
  const User = useSelector((state: RootState) => state.user)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setInputVal((prev) => ({ ...prev, [name]: value }))
  }
  return (
    <>
      <label htmlFor="name" className="block mb-1 text-white">
        Name
      </label>
      <input
        type="text"
        id="name"
        placeholder="Enter Name"
        name="Name"
        value={inputVal.Name}
        onChange={handleChange}
        className="mb-4 p-3 w-full rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <label htmlFor="jobTitle" className="block mb-1 text-white">
        Job Title
      </label>
      <input
        type="text"
        id="jobTitle"
        placeholder="Enter Job Title"
        name="JobTitle"
        value={inputVal.JobTitle}
        onChange={handleChange}
        className="mb-4 p-3 w-full rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      {User.Email == 'octtoppus1@gmail.com' ? (
        <>
          <label htmlFor="JobDescription" className="block mb-1 text-white">
            Job Description
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter JobDescription"
            name="JobDescription"
            value={inputVal.JobDescription}
            onChange={handleChange}
            className="mb-4 p-3 w-full rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <label htmlFor="Salary" className="block mb-1 text-white">
            Salary
          </label>
          <input
            type="number"
            id="name"
            placeholder="Enter Salary"
            name="Salary"
            value={inputVal.Salary}
            onChange={handleChange}
            className="mb-4 p-3 w-full rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </>
      ) : (
        ''
      )}
    </>
  )
}
export default UpdateInputFields
