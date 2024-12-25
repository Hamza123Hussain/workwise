import React, { useState, useEffect } from 'react'
import axios from 'axios'

interface Message {
  recipientId: string
  text: string
  timestamp: number
  userId: string
}

const ChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Make a GET request to the backend endpoint
        const response = await axios.get(
          `https://workwise-backend-puce.vercel.app/Api/Message/GetMessages?chatId=user1-user2`
        )
        setMessages(response.data.messages)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [])

  if (loading) return <div>Loading messages...</div>

  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Chat Messages</h2>
      {messages.length === 0 ? (
        <p>No messages found for this chat.</p>
      ) : (
        <ul className="space-y-3">
          {messages.map((message, index) => (
            <li
              key={index}
              className={`p-3 rounded-lg ${
                message.userId === 'user1'
                  ? 'bg-blue-100 text-right ml-auto'
                  : 'bg-gray-100 text-left mr-auto'
              }`}
              style={{ maxWidth: '75%' }}
            >
              <p className="text-sm font-medium">{message.text}</p>
              <p className="text-xs text-gray-500">
                {new Date(message.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ChatMessages
