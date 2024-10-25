import { configureStore } from '@reduxjs/toolkit'
import { UserSlice } from '../Slice/User/UserSlice' // Adjust the import path accordingly
import { SelectSlice } from '../Slice/SelectUser/SelectSlice'
import { Location_Slice } from '../Slice/Location_Slice/Location_Slice'
import { SortSlice } from '../Slice/Sorting_Slice/Sorting_Slice'
const Store = configureStore({
  reducer: {
    user: UserSlice.reducer, // Add UserSlice reducer here
    Select: SelectSlice.reducer,
    location: Location_Slice.reducer,
    sort: SortSlice.reducer,
  },
})

export default Store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>
// Inferred type: {some: SomeStateType}
export type AppDispatch = typeof Store.dispatch
