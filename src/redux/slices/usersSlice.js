import { createSlice } from "@reduxjs/toolkit"

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    usersLoaded: []
  },
  reducers: {
    loadUsers: (state, action) => {
      state.usersLoaded = action.payload
    }
  }
})

export const { loadUsers } = usersSlice.actions


export default usersSlice.reducer
