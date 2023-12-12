import { createSlice } from "@reduxjs/toolkit";

const compare = (a, b, charter, sortOrder) => {
  const titleA = a.title.toLowerCase();
  const titleB = b.title.toLowerCase();

  if (charter === "low") {
    return sortOrder === "high"
      ? titleA.localeCompare(titleB)
      : titleB.localeCompare(titleA);
  } else if (charter === "high") {
    return sortOrder === "low"
      ? titleB.localeCompare(titleA)
      : titleA.localeCompare(titleB);
  } else if (charter === "lowPrice") {
    return sortOrder === "high" ? a.price - b.price : b.price - a.price;
  } else if (charter === "highPrice") {
    return sortOrder === "low" ? b.price - a.price : a.price - b.price;
  }

  return 0;
};

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    searchTerm: "",
    selectedCategory: "",
    sortOrder: "asc",
    charter: "low",
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.products.sort((a, b) =>
        compare(a, b, state.charter, state.sortOrder)
      );
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
      state.products.sort((a, b) =>
        compare(a, b, state.charter, action.payload)
      );
    },
    setCharter: (state, action) => {
      state.charter = action.payload;
      state.products.sort((a, b) =>
        compare(a, b, action.payload, state.sortOrder)
      );
    },


  },
  
});

export const {
  setProducts,
  setSearchTerm,
  setSelectedCategory,
  setCategory,
  setSortOrder,
  setCharter,
} = productSlice.actions;

export const selectProducts = (state) => state.product.products;
export const selectSearchTerm = (state) => state.product.searchTerm;
export const selectCategory = (state) => state.product.selectedCategory;
export const selectSortOrder = (state) => state.product.sortOrder;
export const selectCharter = (state) => state.product.charter;
export const sortByCharacter = (products, charter) => {
  return products.sort((a, b) => compare(a, b, charter));
};

export const sortByPrice = (products, sortOrder) => {
  return products.sort((a, b) => compare(a, b, "lowPrice", sortOrder));
};

export default productSlice.reducer;
