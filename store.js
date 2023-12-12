// store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./src/View/User/Component/productlist/fitur/slice";
import productSlice from "./src/View/User/Component/productlist/fitur/productSlice";
import sortHistoryReducer from "./src/View/User/Component/productlist/fitur/sortHistorySlice";


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productSlice,
    sortHistory: sortHistoryReducer,
  },
});

export default store;
