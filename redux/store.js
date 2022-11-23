import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import sidebarReducer from "./sidebar";
import userReducer from "./user";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    sidebar: sidebarReducer,
    user: userReducer,
  },
});
