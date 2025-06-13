import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type CartItem = {
  id: number;
  title: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
};

type InitialState = {
  items: CartItem[];
};

const initialState: InitialState = {
  items: [],
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;

      // Match not only by id but also by preview image (to support variants)
      const existingItem = state.items.find(
        (item) =>
          item.id === newItem.id &&
          item.imgs?.previews?.[0] === newItem.imgs?.previews?.[0]
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
    },

    removeItemFromCart: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
    },

    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },

    removeAllItemsFromCart: (state) => {
      state.items = [];
    },
  },
});

// Selectors
export const selectCartItems = (state: RootState) => state.cartReducer.items;

export const selectTotalPrice = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.discountedPrice * item.quantity, 0)
);

// Actions & Reducer
export const {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  removeAllItemsFromCart,
} = cart.actions;

export default cart.reducer;
