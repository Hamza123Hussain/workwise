import React from 'react'
import { FaExclamationCircle, FaRegCommentAlt } from 'react-icons/fa'

interface NoticeProps {
  title: string
  description: string
  author: string
  date: string
}

const NoticeCard: React.FC<NoticeProps> = ({
  title,
  description,
  author,
  date,
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 shadow-lg rounded-lg p-4 hover:scale-105 transition-transform duration-300">
      <div className="flex items-center space-x-3">
        <FaExclamationCircle className="text-2xl text-blue-600" />
        <h2 className="text-sm sm:text-xl md:text-2xl font-semibold text-gray-800">
          {title}
        </h2>
      </div>
      <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-2 mt-2">
        {description}
      </p>
      <div className="flex justify-between text-xs sm:text-sm md:text-base text-gray-500">
        <span className="flex items-center space-x-1">
          <FaRegCommentAlt />
          <span>By: {author}</span>
        </span>
        <span>{new Date(date).toLocaleDateString()}</span>
      </div>
    </div>
  )
}

export default NoticeCard
