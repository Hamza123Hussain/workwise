import { MessageInterface } from '@/utils/Interfaces/MessageInterface'
import { RootState } from '@/utils/Redux/Store/Store'
import React from 'react'
import { useSelector } from 'react-redux'
const SingleMessage = ({ message }: { message: MessageInterface }) => {
  const User = useSelector((state: RootState) => state.user)
  return (
    <li
      key={message.timestamp}
      className={`p-3 rounded-lg shadow-md w-fit ${
        message.userId === User._id
          ? 'bg-blue-300 text-right ml-auto'
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
