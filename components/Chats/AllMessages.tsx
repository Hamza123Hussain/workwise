import React, { useState, useEffect } from 'react'
import { database } from '@/utils/FireBaseConfig'
import { onChildAdded, ref } from '@firebase/database'
import { Message } from '@/utils/MessageInterface'
import { fetchMessages } from '@/functions/Chats/GettingMessages'
import SingleMessage from './SingleMessage'
const ChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    fetchMessages('user1-user2', setMessages, setLoading)
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
    <div className="flex flex-col gap-3 w-full p-4  bg-white">
      {messages.length === 0 ? (
        <p className="text-center text-gray-500 h-[70vh] overflow-y-auto">
          No messages found for this chat.
        </p>
      ) : (
        <ul className="space-y-3 h-[70vh] overflow-y-auto bg-white">
          {messages.map((message) => (
            <SingleMessage message={message} key={message.timestamp} />
          ))}
        </ul>
      )}
    </div>
  )
}
export default ChatMessages
