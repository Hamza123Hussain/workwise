import { Message } from '@/utils/MessageInterface'
import React from 'react'

const SingleMessage = ({ message }: { message: Message }) => {
  return (
    <li
      key={message.timestamp}
      className={`p-3 rounded-lg shadow-md w-fit ${
        message.userId === 'user1'
          ? 'bg-blue-100 text-right ml-auto'
          : 'bg-gray-100 text-left mr-auto'
      }`}
    >
      <p className="text-sm font-medium">{message.text}</p>
      <p className="text-xs text-gray-500">
        {new Date(message.timestamp).toLocaleString()}
      </p>
    </li>
  )
}

export default SingleMessage
