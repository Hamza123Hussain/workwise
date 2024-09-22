import React from 'react'
import Sidebar from './components/SideBar'

function App() {
  return (
    <div className=" flex min-h-screen">
      <Sidebar />

      <h1 className="text-3xl font-bold text-[#003366]">Welcome to WorkWise</h1>
      <p className="mt-4 text-gray-700">
        This is your hub for managing tasks, check-ins, and more.
      </p>
    </div>
  )
}

export default App
