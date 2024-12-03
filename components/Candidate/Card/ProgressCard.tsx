import React from 'react'

const ProgressCard = ({ Progress }: { Progress: string }) => {
  const getProgressColor = (progress: string) => {
    switch (progress) {
      case 'NotNeeded':
        return 'bg-gray-200 text-gray-700'
      case 'Interviewed':
        return 'bg-teal-100 text-teal-700'
      case 'Hired':
        return 'bg-green-100 text-green-800'
      case 'Called':
        return 'bg-yellow-100 text-yellow-800'
      case 'Offered':
        return 'bg-orange-100 text-orange-800'
      case 'New':
        return 'bg-indigo-100 text-indigo-800'
      default:
        return 'bg-gray-200 text-gray-700'
    }
  }
  return (
    <div className="flex items-center justify-center mt-4">
      <span
        className={`px-4 py-2 rounded-full text-sm font-semibold ${getProgressColor(
          Progress
        )}`}
      >
        {Progress}
      </span>
    </div>
  )
}

export default ProgressCard
