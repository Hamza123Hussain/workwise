import React from 'react'

// Helper function to calculate deducted points based on status and priority

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
        {/* Deduction Criteria Section */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-[#5925da] mb-6 text-center">
            Task Deduction Criteria
          </h2>
          {/* Before Deduction Table */}
          {/* After Deduction Table */}
          <div className="overflow-x-auto">
            <h3 className="text-xl font-semibold text-[#5925da] mb-4">
              Task Deduction Percentage
            </h3>
            <table className="min-w-full text-left table-auto">
              <thead className="bg-[#5925da] text-white">
                <tr>
                  <th className="px-4 py-2 text-nowrap">Status</th>
                  <th className="px-4 py-2 text-nowrap">High</th>
                  <th className="px-4 py-2 text-nowrap">Medium</th>
                  <th className="px-4 py-2 text-nowrap">Low</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr>
                  <td className="border px-4 py-2 text-nowrap">Completed</td>
                  <td className="border px-4 py-2 text-nowrap">100.00%</td>
                  <td className="border px-4 py-2 text-nowrap">100.00%</td>
                  <td className="border px-4 py-2 text-nowrap">100.00%</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 text-nowrap ">In Progress</td>
                  <td className="border px-4 py-2 text-nowrap">
                    {(100 - 27).toFixed(2)}%
                  </td>
                  <td className="border px-4 py-2 text-nowrap">
                    {(100 - 19).toFixed(2)}%
                  </td>
                  <td className="border px-4 py-2 text-nowrap">
                    {(100 - 9).toFixed(2)}%
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 text-nowrap">
                    Minor Progress
                  </td>
                  <td className="border px-4 py-2 text-nowrap">
                    {(100 - 55).toFixed(2)}%
                  </td>
                  <td className="border px-4 py-2 text-nowrap">
                    {(100 - 31).toFixed(2)}%
                  </td>
                  <td className="border px-4 py-2 text-nowrap">
                    {(100 - 12).toFixed(2)}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>{' '}
          <div className="overflow-x-auto mt-12">
            <h3 className="text-xl font-semibold text-[#5925da] mb-4">
              Points After Deduction
            </h3>
            <table className="min-w-full text-left table-auto">
              <thead className="bg-[#5925da] text-white">
                <tr>
                  <th className="px-4 py-2 text-nowrap">Status</th>
                  <th className="px-4 py-2 text-nowrap">High</th>
                  <th className="px-4 py-2 text-nowrap">Medium</th>
                  <th className="px-4 py-2 text-nowrap">Low</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr>
                  <td className="border px-4 py-2 text-nowrap">Completed</td>
                  <td className="border px-4 py-2 text-nowrap">10.00</td>
                  <td className="border px-4 py-2 text-nowrap">5.00</td>
                  <td className="border px-4 py-2 text-nowrap">2.50</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 text-nowrap">In Progress</td>
                  <td className="border px-4 py-2 text-nowrap">7.30</td>
                  <td className="border px-4 py-2 text-nowrap">4.05</td>
                  <td className="border px-4 py-2 text-nowrap">2.275</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 text-nowrap">
                    Minor Progress
                  </td>
                  <td className="border px-4 py-2 text-nowrap">4.50</td>
                  <td className="border px-4 py-2 text-nowrap">3.45</td>
                  <td className="border px-4 py-2 text-nowrap">2.20</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Guide
