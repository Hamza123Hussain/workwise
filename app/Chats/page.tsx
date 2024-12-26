'use client'
import ChatMessages from '@/components/Chats/AllMessages'
import Users from '@/components/Chats/Users'
import React from 'react'

const Chats = () => {
  return (
    <div className="flex flex-col lg:flex-row mt-10 gap-6 px-4">
      {/* Sidebar for Users */}
      <div className="lg:w-1/4 w-full bg-gray-800 rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold text-white mb-4">Users</h2>
        <Users />
      </div>

      {/* Chat Messages Section */}
      <div className="lg:w-3/4 w-full bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Chat Messages
        </h2>
        <ChatMessages />
      </div>
    </div>
  )
}

export default Chats
