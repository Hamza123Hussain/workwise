import { InputValues } from '@/utils/SignUpInterface'
import React from 'react'
import ImagePreview from './ImagePreview'
const UpdateInputFields = ({
  inputVal,
  setInputVal,
}: {
  inputVal: InputValues
  setInputVal: React.Dispatch<React.SetStateAction<InputValues>>
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setInputVal((prev) => ({ ...prev, [name]: value }))
  }
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null // Get the first file or null
    setInputVal((prev: InputValues) => ({
      ...prev,
      Image: file,
    }))
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

      <label htmlFor="imageUpload" className="block mb-1 text-white">
        Upload Image
      </label>
      <input
        type="file"
        id="imageUpload"
        onChange={handleImageChange}
        className="mb-4 p-3 w-full rounded bg-gray-800 text-white focus:outline-none"
      />
      <ImagePreview />
    </>
  )
}

export default UpdateInputFields
