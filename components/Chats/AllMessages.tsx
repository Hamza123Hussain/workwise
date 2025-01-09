import React, { useState, useEffect } from 'react'
import { database } from '@/utils/FireBaseConfig'
import { onChildAdded, ref } from '@firebase/database'
import { Message } from '@/utils/Interfaces/MessageInterface'
import { fetchMessages } from '@/functions/Chats/GettingMessages'
import SingleMessage from './SingleMessage'
import ChatLoader from './ChatLoader'
const ChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const messageIds = new Set<string>() // To track unique message IDs
  useEffect(() => {
    setLoading(true)
    // Fetch initial messages
    fetchMessages('user1-hamza', (fetchedMessages) => {
      // Add only unique messages to the state
      const uniqueMessages = fetchedMessages.filter(
        (message) => !messageIds.has(message.timestamp.toString())
      )
      uniqueMessages.forEach((message) =>
        messageIds.add(message.timestamp.toString())
      )
      setMessages(uniqueMessages)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    setLoading(true)
    // Listen for new messages in Firebase
    const chatRef = ref(database, `chats/user1-hamza/messages`)
    const unsubscribe = onChildAdded(chatRef, (snapshot) => {
      if (snapshot.exists()) {
        const newMessage = {
          id: snapshot.key,
          ...snapshot.val(),
        }
        // Add only unique messages
        setMessages((prevMessages) => [...prevMessages, newMessage])
        setLoading(false)
      }
    })
    return () => {
      unsubscribe() // Cleanup listener on component unmount
    }
  }, [])
  return (
    <div className="flex flex-col gap-3 w-full p-4 h-[70vh] bg-white">
      {loading ? (
        <div className=" flex justify-center min-h-screen items-center">
          <ChatLoader />
        </div>
      ) : messages.length === 0 ? (
        <p className="text-center text-gray-500  overflow-y-auto">
          No messages found for this chat.
        </p>
      ) : (
        <ul className="space-y-3  overflow-y-auto bg-white">
          {messages.map((message) => (
            <SingleMessage message={message} key={message.timestamp} />
          ))}
        </ul>
      )}
    </div>
  )
}
export default ChatMessages
