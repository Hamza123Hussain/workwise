import { SendMessage } from '@/functions/Chats/SendMesage'
import { RootState } from '@/utils/Redux/Store/Store'
import React, { useState } from 'react'
import { IoMdSend } from 'react-icons/io'
import { useSelector } from 'react-redux'

const InputBar = () => {
  const [messageText, setMessageText] = useState('')
  const Chat = useSelector((state: RootState) => state.Chat)
  const User = useSelector((state: RootState) => state.user)
  const handleSendMessage = async () => {
    if (messageText.trim()) {
      await SendMessage(
        messageText,
        User.Name,
        Chat.recipient.Name,
        `${Chat.recipient.Email}---${User.Email}`
      )
      setMessageText('')
    }
  }

  return (
    <div className="flex items-center bg-gray-800 p-3 mt-4 shadow-md">
      <input
        type="text"
        placeholder="Type your message..."
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        className="flex-grow bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSendMessage}
        className={`ml-3 p-2 rounded-full ${
          messageText.trim()
            ? 'bg-blue-500 hover:bg-blue-600'
            : 'bg-gray-500 cursor-not-allowed'
        }`}
        disabled={!messageText.trim()}
      >
        <IoMdSend className="text-white text-xl" />
      </button>
    </div>
  )
}

export default InputBar
