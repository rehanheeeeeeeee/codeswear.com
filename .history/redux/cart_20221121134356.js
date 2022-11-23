import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basket: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      console.log(action);
      state.basket = action.payload || [];
    },
    addToCart: (state, action) => {
      if (
        state.basket.map((item) => item.title).includes(action.payload.title)
      ) {
        state.basket = state.basket.map((item) =>
          item.title === action.payload.title
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        action.payload["quantity"] = 1;
        state.basket = [action.payload, ...state.basket];
      }
      saveCart(state);
    },
    clearCart: (state) => {
      state.basket = [];
      localStorage.setItem("cart", []);
    },
    RemoveFromCart: (state, action) => {
      const deletedItemIndex = state.basket.findIndex(
        (item) => item.title === action.payload
      );
      if (state.basket[deletedItemIndex].quantity > 1) {
        state.basket = state.basket.map((item) =>
          item.title === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        state.basket = state.basket.filter(
          (item) => item.title !== action.payload
        );
      }
      saveCart(state);
    },
  },
});
const saveCart = (state) => {
  localStorage.setItem("cart", JSON.stringify(state.basket));
};

export const { addToCart, setCart, clearCart, RemoveFromCart } =
  cartSlice.actions;

export const selectBasket = (state) => {
  return state.cart.basket;
};

export const selectBasketTotal = (state) => {
  return state.cart.basket.reduce(
    (prev, item) => item.price * item.quantity + prev,
    0
  );
};

export default cartSlice.reducer;
