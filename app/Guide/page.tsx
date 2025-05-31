import React from 'react'

const Guide: React.FC = () => {
  return (
    <div className="bg-gray-50 py-10 px-6 lg:px-16 mt-5">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Title Section */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-[#5925da] mb-4">
            Task Performance & Attendance Guide
          </h1>
          <p className="text-lg text-gray-700">
            Understanding how task performance and attendance contribute to your
            overall score.
          </p>
        </div>

        {/* Performance Breakdown Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-[#5925da] mb-6">
            Performance Breakdown
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Your performance will be calculated based on the following criteria:
          </p>
          <div className="flex justify-center gap-16">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800">
                Task Performance
              </h3>
              <p className="text-xl text-[#5925da]">80%</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800">
                Attendance
              </h3>
              <p className="text-xl text-[#5925da]">20%</p>
            </div>
          </div>
        </div>

        {/* Performance Calculation Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-[#5925da] mb-4">
            How Task Performance is Calculated
          </h2>
          <p className="text-lg text-gray-700">
            Your task performance percentage is calculated by dividing the total
            points you gained by the total available points
          </p>
          <p className="mt-4 text-lg font-medium text-gray-800">
            Formula:{' '}
            <span className="text-[#5925da]">
              {' '}
              (Points Gained / Total Points) × 100{' '}
            </span>
          </p>
        </div>

        {/* Task Types Section */}
        <div className="grid md:grid-cols-3 gap-8 my-12">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-2xl font-semibold text-[#5925da] mb-4">
              High Priority
            </h3>
            <p className="text-lg text-gray-700">10 Points</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-2xl font-semibold text-[#5925da] mb-4">
              Medium Priority
            </h3>
            <p className="text-lg text-gray-700">5 Points</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-2xl font-semibold text-[#5925da] mb-4">
              Low Priority
            </h3>
            <p className="text-lg text-gray-700">2.5 Points</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Guide
