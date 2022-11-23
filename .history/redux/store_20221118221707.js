import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import sidebarReducer from "./sidebar";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    sidebar: sidebarReducer,
  },
});
