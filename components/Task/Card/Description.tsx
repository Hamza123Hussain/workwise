import React, { useState } from 'react'
import { AiOutlineEdit, AiOutlineSave, AiOutlineClose } from 'react-icons/ai'

interface DescriptionProps {
  Description: string
}

const Description = ({ Description }: DescriptionProps) => {
  const [description, setDescription] = useState(Description)
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="mt-4 p-3">
      <div className="flex items-center mb-2">
        <span className="text-gray-800 font-semibold text-lg mr-2">
          Description:
        </span>
        {isEditing ? (
          <AiOutlineSave
            onClick={() => setIsEditing(false)}
            className="text-green-500 cursor-pointer text-xl"
          />
        ) : (
          <AiOutlineEdit
            onClick={() => setIsEditing(true)}
            className="text-blue-500 cursor-pointer text-xl"
          />
        )}
      </div>
      {isEditing ? (
        <>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
            rows={4}
          />
          <button
            onClick={() => {
              setDescription(Description)
              setIsEditing(false)
            }}
            className="mt-2 flex items-center text-sm text-gray-600 hover:text-gray-800"
          >
            <AiOutlineClose className="mr-1" /> Cancel
          </button>
        </>
      ) : (
        <p className="text-gray-700 leading-relaxed">{description}</p>
      )}
    </div>
  )
}

export default Description
