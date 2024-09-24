import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  createdAt: '',
  Email: '',
  imageUrl: '',
  Name: '',
  _id: '',
}

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    GetUserData: (state, action) => {
      state._id = action.payload._id
      state.Name = action.payload.Name
      state.createdAt = action.payload.createdAt
      state.Email = action.payload.Email
      state.imageUrl = action.payload.imageUrl
    },
    ClearUser: (state) => {
      // Resetting each property individually
      state._id = ''
      state.Name = ''
      state.createdAt = ''
      state.Email = ''
      state.imageUrl = ''
    },
  },
})

export const { GetUserData, ClearUser } = UserSlice.actions

export default UserSlice.reducer