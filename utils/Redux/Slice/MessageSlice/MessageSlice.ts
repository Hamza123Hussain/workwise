import { MessageInterface } from '@/utils/Interfaces/MessageInterface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MessageState {
  messages: MessageInterface[]
}

// ✅ Correct Initial State
const initialState: MessageState = {
  messages: [],
}

export const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    // ✅ Add a new message
    FillUpMessages: (state, action: PayloadAction<MessageInterface[]>) => {
      state.messages = Array.isArray(action.payload) ? action.payload : [] // Ensure it's an array
    },
    addMessage: (state, action: PayloadAction<MessageInterface>) => {
      state.messages.push(action.payload)
    },

    // ✅ Update a message by timestamp
    updateMessage: (
      state,
      action: PayloadAction<{ timestamp: number; newText: string }>
    ) => {
      const message = state.messages.find(
        (msg) => msg.timestamp === action.payload.timestamp
      )
      if (message) {
        message.text = action.payload.newText
      }
    },

    // ✅ Delete a message by timestamp
    deleteMessage: (state, action: PayloadAction<number>) => {
      state.messages = state.messages.filter(
        (msg) => msg.timestamp !== action.payload
      )
    },

    // ✅ Clear all messages
    clearMessages: (state) => {
      state.messages = []
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
