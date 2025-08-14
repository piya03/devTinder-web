import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload
    },
    removeUser: (state, action) => {
      const newArr = state.filter(elem => elem.id !== action.payload)
      return newArr
    },
    logoutUser: (state, action) => null

  }
})

export const { addUser, removeUser, logoutUser } = userSlice.actions
export default userSlice.reducer