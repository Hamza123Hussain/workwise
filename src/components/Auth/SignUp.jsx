import React, { useState } from 'react'
import { handleSignup } from '../../functions/Auth/Signup'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [image, setImage] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()

    // Check if the image file is properly selected
    console.log('Image File:', image)

    // Check before sending the data
    const data = await handleSignup(name, email, password, image)
    if (data) {
      console.log('API Response:', data)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-auto my-5 p-3">
      <h2 className="text-3xl font-semibold text-[#FF9A8B] mb-6 text-center">
        Signup
      </h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9A8B]"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9A8B]"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9A8B]"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Upload Profile Picture:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0])
              console.log('Selected Image:', e.target.files[0]) // Log image selection
            }}
            className="w-full p-3 border rounded-md file:bg-gray-800 file:text-white file:rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9A8B]"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#FF9A8B] text-white p-3 rounded-lg hover:bg-[#ff8777] transition duration-200"
        >
          Signup
        </button>
      </form>
    </div>
  )
}

export default Signup
