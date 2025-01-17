import React from 'react'
import { FaCalendarAlt, FaExclamationCircle } from 'react-icons/fa'

const Priority_Date = ({
  Priority,
  DueDate,
}: {
  Priority: string
  DueDate: string
}) => {
  const formatDueDate = (dueDate: string) => {
    const date = new Date(dueDate)
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return date.toLocaleDateString('en-US', options)
  }
  return (
    <>
      {/* Priority */}
      <div className="flex items-center mb-2">
        <FaExclamationCircle className="mr-2 text-red-500" />{' '}
        {/* Changed icon color */}
        <span className="font-semibold text-lg">{Priority}</span>
      </div>

      {/* Due Date */}
      <div className="flex items-center mb-2">
        <FaCalendarAlt className="mr-2 text-yellow-500" />{' '}
        {/* Changed icon color */}
        <span className="text-lg">
          {' '}
          Due Date : {formatDueDate(DueDate ? DueDate : '')}
        </span>{' '}
        {/* Only shows the date */}
      </div>
    </>
  )
}

export default Priority_Date
