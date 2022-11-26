import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", action.payload);
    },
    emptyUser: (state, action) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, emptyUser } = user.actions;

export const selectUser = (state) => {
  return state.user.user;
};

export default user.reducer;
