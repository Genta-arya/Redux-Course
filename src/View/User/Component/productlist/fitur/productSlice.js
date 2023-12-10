import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    searchTerm: "",
    selectedCategory: "",
    sortOrder: "asc",
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
  },
});

export const {
  setProducts,
  setSearchTerm,
  setSelectedCategory,
  setCategory,
  setSortOrder,
} = productSlice.actions;
export const selectProducts = (state) => state.product.products;
export const selectSearchTerm = (state) => state.product.searchTerm;
export const selectCategory = (state) => state.product.selectedCategory;
export const selectSortOrder = (state) => state.product.sortOrder;
export default productSlice.reducer;
