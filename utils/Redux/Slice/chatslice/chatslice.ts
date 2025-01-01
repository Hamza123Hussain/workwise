import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  userId: '',
  recipient: {
    Name: '',
    Email: '',
    _id: '',
  },
  chatId: '',
}
export const ChatSlice = createSlice({
  name: 'Chat',
  initialState,
  reducers: {
    SetRecipentID: (state, { payload }) => (
      (state.recipient.Email = payload.Email),
      (state.recipient.Name = payload.Name),
      (state.recipient._id = payload._id)
    ),
    SetChatID: (state, { payload }) => (state.chatId = payload),
  },
})
export const { SetChatID, SetRecipentID } = ChatSlice.actions
