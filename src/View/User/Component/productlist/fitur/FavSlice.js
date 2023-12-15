// In your fitur/slice.js or a new file for favorites
import { createSlice } from "@reduxjs/toolkit";

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
  },
  reducers: {
    addToFavorites: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export const selectFavorites = (state) => state.favorites.items;

export default favoritesSlice.reducer;
