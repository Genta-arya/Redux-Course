import { createSlice } from "@reduxjs/toolkit";
const compareStrings = (a, b, sortOrder) => {
  const comparison = a.localeCompare(b);
  return sortOrder === "asc" ? comparison : -comparison;
};

export const sortHistorySlice = createSlice({
  name: "sortHistory",
  initialState: {
    sortType: "name",
    sortOrder: "asc",
    shoppingHistory: [],
  },
  reducers: {
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setShoppingHistory: (state, action) => {
      state.shoppingHistory = action.payload;
    },
    sortShoppingHistory: (state) => {
      state.shoppingHistory.sort((a, b) =>
        compareStrings(a.nm_product, b.nm_product, state.sortOrder)
      );
    },
  },
});

export const {
  setSortType,
  setSortOrder,
  setShoppingHistory,
  sortShoppingHistory,
} = sortHistorySlice.actions;

export const selectSortType = (state) => state.sortHistory.sortType;
export const selectSortOrder = (state) => state.sortHistory.sortOrder;
export const selectShoppingHistory = (state) =>
  state.sortHistory.shoppingHistory;

export default sortHistorySlice.reducer;
