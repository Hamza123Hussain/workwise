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
      <div className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter Name"
            name="Name"
            value={inputVal.Name}
            onChange={handleChange}
            className="mt-1 p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="jobTitle"
            className="block text-sm font-medium text-gray-700"
          >
            Job Title
          </label>
          <input
            type="text"
            id="jobTitle"
            placeholder="Enter Job Title"
            name="JobTitle"
            value={inputVal.JobTitle}
            onChange={handleChange}
            className="mt-1 p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        {User.Email === 'octtoppus1@gmail.com' && (
          <>
            <div>
              <label
                htmlFor="JobDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Job Description
              </label>
              <input
                type="text"
                id="JobDescription"
                placeholder="Enter Job Description"
                name="JobDescription"
                value={inputVal.JobDescription}
                onChange={handleChange}
                className="mt-1 p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="Salary"
                className="block text-sm font-medium text-gray-700"
              >
                Salary
              </label>
              <input
                type="number"
                id="Salary"
                placeholder="Enter Salary"
                name="Salary"
                value={inputVal.Salary}
                onChange={handleChange}
                className="mt-1 p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="Role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <input
                type="text"
                id="Role"
                placeholder="Enter Salary"
                name="Role"
                value={inputVal.Role}
                onChange={handleChange}
                className="mt-1 p-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default UpdateInputFields
