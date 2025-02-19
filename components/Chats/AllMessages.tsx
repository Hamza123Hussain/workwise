import React from 'react'
import SingleMessage from './SingleMessage'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
import MessageLoader from './MessageLoader'
const ChatMessages = () => {
  const messages = useSelector((state: RootState) => state.Messages.messages)
  const ChatLoadingMesage = useSelector(
    (state: RootState) => state.Messages.chatMessage
  )
  const ChatLoading = useSelector((state: RootState) => state.Chat.ChatLoading)
  // useEffect(() => {
  //   setLoading(true)
  //   // Listen for new messages in Firebase
  //   const chatRef = ref(database, `chats/user1-hamza/messages`)
  //   const unsubscribe = onChildAdded(chatRef, (snapshot) => {
  //     if (snapshot.exists()) {
  //       const newMessage = {
  //         id: snapshot.key,
  //         ...snapshot.val(),
  //       }
  //       // Add only unique messages
  //       setMessages((prevMessages) => [...prevMessages, newMessage])
  //       setLoading(false)
  //     }
  //   })
  //   return () => {
  //     unsubscribe() // Cleanup listener on component unmount
  //   }
  // }, [])
  return (
    <div className="flex flex-col gap-3 w-full p-4 h-[70vh] bg-white">
      {ChatLoading ? (
        <div className=" flex justify-center items-center h-full ">
          <MessageLoader />
        </div>
      ) : messages !== null && messages.length == 0 ? (
        <p className="text-center text-gray-500  overflow-y-auto">
          {ChatLoadingMesage}
        </p>
      ) : (
        <ul className="space-y-3  overflow-y-auto bg-white">
          {messages !== null &&
            messages.map((message) => (
              <SingleMessage message={message} key={message.timestamp} />
            ))}
        </ul>
      )}
    </div>
  )
}
export default ChatMessages
