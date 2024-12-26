'use client'
import ChatMessages from '@/components/Chats/AllMessages'
import InputBar from '@/components/Chats/InputBar'
import Users from '@/components/Chats/Users'
import React from 'react'

const Chats = () => {
  return (
    <div className="flex flex-col lg:flex-row mt-20 mb-5  px-4">
      {/* Sidebar for Users */}
      <div className="lg:w-1/4 w-full bg-gray-800 shadow-md p-4 z-30">
        <h2 className="text-lg font-semibold text-white mb-4">Users</h2>
        <Users />
      </div>

      {/* Chat Messages Section */}
      <div className="lg:w-3/4 w-full  shadow-md border-l-2 border-l-purple-500">
        <header className="bg-purple-500 text-white py-3 px-6">
          <h2 className="text-xl font-bold">Chat Messages</h2>
          <p className="text-sm text-gray-200">
            View and send messages in real-time.
          </p>
        </header>
        {/* <h2 className="text-lg font-semibold bg-white text-gray-800 mb-4">
          Chat Messages
        </h2> */}
        <ChatMessages />
        <InputBar />
      </div>
    </div>
  )
}

export default Chats
