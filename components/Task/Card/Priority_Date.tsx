import React from 'react'
import { MdPriorityHigh, MdDateRange } from 'react-icons/md'

interface PriorityDateProps {
  Priority: string
  DueDate: string
}

const PriorityDate = ({ Priority, DueDate }: PriorityDateProps) => {
  const formatDueDate = (dateStr: string) => {
    if (!dateStr) return 'No due date'
    const date = new Date(dateStr)
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return date.toLocaleDateString('en-US', options)
  }

  return (
    <div className="space-y-2 p-3">
      {/* Priority */}
      <div className="flex items-center">
        <MdPriorityHigh className="text-red-500 text-xl mr-2" />
        <span className="text-gray-800 font-semibold text-lg">{Priority}</span>
      </div>
      {/* Due Date */}
      <div className="flex items-center">
        <MdDateRange className="text-yellow-500 text-xl mr-2" />
        <span className="text-gray-700 text-lg">
          Due Date: {formatDueDate(DueDate)}
        </span>
      </div>
    </div>
  )
}

export default PriorityDate
