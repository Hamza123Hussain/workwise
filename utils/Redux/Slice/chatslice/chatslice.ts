import { createSlice, PayloadAction } from '@reduxjs/toolkit'
const initialState = {
  userId: '',
  recipientDetails: {
    Name: '',
    Email: '',
    UserID: '',
  },
  chatId: '',
  UserActive: '',
}
export const ChatSlice = createSlice({
  name: 'Chat',
  initialState,
  reducers: {
    SetRecipentDetails: (
      state,
      action: PayloadAction<{ Name: string; Email: string; UserID: string }>
    ) => {
      // ✅ Fix: Modify state directly (DO NOT return a new object)
      state.recipientDetails = action.payload
    },
    ClearRecipentDetails: (state) => {
      // ✅ Fix: Modify state directly (DO NOT return a new object)
      state.recipientDetails = { Name: '', Email: '', UserID: '' }
    },
    SetUserActive: (state, action) => (state.UserActive = action.payload),
    SetChatID: (state, { payload }) => (state.chatId = payload),
  },
})
export const {
  SetChatID,
  SetRecipentDetails,
  SetUserActive,
  ClearRecipentDetails,
} = ChatSlice.actions
