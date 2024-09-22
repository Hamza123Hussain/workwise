import React from 'react'

const FileField = ({ onChange, Text }) => {
  return (
    <div className="bg-transparent border-slate-300 border-2 p-4 rounded-lg shadow-md">
      <label
        htmlFor="profile-image"
        className="block text-gray-500 text-lg font-semibold mb-2"
      >
        {Text}
      </label>
      <input
        id="profile-image"
        type="file"
        name="Image"
        onChange={onChange}
        accept=".jpg,.jpeg,.png,.webp" // Restrict file types
        className="block w-full text-sm text-gray-500 file:cursor-pointer file:bg-purple-500 file:text-white file:py-2 file:px-4 file:rounded-lg file:border-0 hover:file:bg-purple-600"
      />
    </div>
  )
}

export default FileField
