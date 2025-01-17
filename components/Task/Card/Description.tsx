import React, { useState } from 'react'
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa'
const Description = ({ Description }: { Description: string }) => {
  const [description, setDescription] = useState(Description) // State for editable description
  const [isEditing, setIsEditing] = useState(false) // State to toggle between view/edit mode
  return (
    <div className="flex flex-col mb-6">
      <label
        htmlFor="description"
        className="font-semibold text-lg mb-2 flex items-center"
      >
        <FaEdit className="mr-2 text-purple-500" /> {/* Changed icon color */}
        Description:
      </label>
      {isEditing ? (
        <textarea
          id="description"
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      ) : (
        <p className="text-gray-700">{description}</p>
      )}
      {isEditing ? (
        <div className="flex space-x-3">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600"
            onClick={() => setIsEditing(false)} // Save changes and exit edit mode
          >
            <FaSave className="inline mr-1" />
            Save
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md font-semibold hover:bg-gray-400"
            onClick={() => {
              setDescription(Description) // Reset description to original value
              setIsEditing(false)
            }}
          >
            <FaTimes className="inline mr-1" />
            Cancel
          </button>
        </div>
      ) : (
        <button
          className="text-blue-500 hover:underline mt-2 flex items-center"
          onClick={() => setIsEditing(true)}
        >
          <FaEdit className="mr-1" />
          Edit Description
        </button>
      )}
    </div>
  )
}
export default Description
