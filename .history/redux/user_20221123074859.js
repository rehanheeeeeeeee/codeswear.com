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
    },
    emptyUser: (state, action) => {
      state.user = null;
    },
  },
});

export const { setUser, emptyUser } = user.actions;

export default user.reducer;
