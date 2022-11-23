import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openSideCart: false,
};

const sidebar = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setOpenSideCart: (state) => {
      state.openSideCart = !state.openSideCart;
    },
  },
});

export const { setOpenSideCart } = sidebar.actions;

export const selectOpenSideCart = (state) => {
  return state.sidebar.openSideCart;
};

export default sidebar.reducer;
