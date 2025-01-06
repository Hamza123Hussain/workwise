import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  createdAt: '',
  Email: '',
  imageUrl: '',
  Name: '',
  _id: '',
  Salary: 0,
  JobDescription: '',
  JobTitle: '',
  Role: '',
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
      state.Salary = action.payload.Salary
      state.JobDescription = action.payload.JobDescription
      state.JobTitle = action.payload.JobTitle
      state.Role = action.payload.Role
    },
    ClearUser: (state) => {
      // Resetting each property individually
      state._id = ''
      state.Name = ''
      state.createdAt = ''
      state.Email = ''
      state.imageUrl = ''
      state.Salary = 0
      state.JobDescription = ''
      state.JobTitle = ''
      state.Role = ''
    },
  },
})
export const { GetUserData, ClearUser } = UserSlice.actions
export default UserSlice.reducer
