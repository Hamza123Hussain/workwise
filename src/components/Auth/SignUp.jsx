import React, { useState } from 'react'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [image, setImage] = useState(null)

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen bg-[#333333] flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
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
            <label className="block text-gray-700">
              Upload Profile Picture:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9A8B]"
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
    </div>
  )
}

export default Signup
