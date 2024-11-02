import React from 'react'

const NoAttendance = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4">
      <h1 className="text-6xl text-black font-bold mb-4">
        No Attendance Records Found
      </h1>
      <p className="text-lg text-gray-300 mb-6">
        It seems you have not recorded any attendance yet. Please check back
        later or reach out to your administrator.
      </p>
      <button className="bg-purple-600 hover:bg-purple-700 text-black font-semibold py-2 px-4 rounded transition duration-300">
        Go to Dashboard
      </button>
    </div>
  )
}

export default NoAttendance
