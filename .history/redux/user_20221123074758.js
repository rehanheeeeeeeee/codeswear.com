import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
});

export const {} = user.actions;

export default user.reducer;
