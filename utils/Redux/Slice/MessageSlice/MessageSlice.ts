import { MessageInterface } from '@/utils/Interfaces/MessageInterface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MessageState {
  messages: MessageInterface[] | null
  chatMessage: string
}

// ✅ Correct Initial State
const initialState: MessageState = {
  messages: [],
  chatMessage: 'NO CHATS HAVE BEEN SELECTED',
}

export const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    // ✅ Add a new message
    FillUpMessages: (state, action: PayloadAction<MessageInterface[]>) => {
      state.messages = Array.isArray(action.payload) ? action.payload : [] // Ensure it's an array
      if (state.messages.length === 0)
        state.chatMessage = 'No Messages Have Been Found'
    },
    addMessage: (state, action: PayloadAction<MessageInterface>) => {
      if (state.messages) state.messages.push(action.payload)
    },

    // ✅ Update a message by timestamp
    updateMessage: (
      state,
      action: PayloadAction<{ timestamp: number; newText: string }>
    ) => {
      if (state.messages === null) return
      const message = state.messages.find(
        (msg) => msg.timestamp === action.payload.timestamp
      )
      if (message) {
        message.text = action.payload.newText
      }
    },

    // ✅ Delete a message by timestamp
    deleteMessage: (state, action: PayloadAction<number>) => {
      if (state.messages === null) return
      state.messages = state.messages.filter(
        (msg) => msg.timestamp !== action.payload
      )
    },

    // ✅ Clear all messages
    clearMessages: (state) => {
      state.messages = null
    },
  },
})

export const {
  addMessage,
  updateMessage,
  FillUpMessages,
  deleteMessage,
  clearMessages,
} = messageSlice.actions
