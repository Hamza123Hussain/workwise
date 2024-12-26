import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { database } from '@/utils/FireBaseConfig'
import { onChildAdded, ref } from '@firebase/database'

interface Message {
  recipientId: string
  text: string
  timestamp: number
  userId: string
}

const ChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
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

  useEffect(() => {
    const chatRef = ref(database, `chats/user1-user2/messages`)

    const unsubscribe = onChildAdded(chatRef, (snapshot) => {
      if (snapshot.exists()) {
        const newMessage = {
          id: snapshot.key,
          ...snapshot.val(),
        }
        setMessages((prevMessages) => [...prevMessages, newMessage])
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  if (loading) return <div>Loading messages...</div>

  return (
    <div className="flex flex-col gap-3">
      {messages.length === 0 ? (
        <p className="text-center text-gray-500">
          No messages found for this chat.
        </p>
      ) : (
        <ul className="space-y-3">
          {messages.map((message, index) => (
            <li
              key={index}
              className={`p-3 rounded-lg shadow-md ${
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
