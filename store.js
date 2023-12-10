// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./src/View/User/Component/productlist/fitur/slice"; 
import productSlice from "./src/View/User/Component/productlist/fitur/productSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productSlice,
    
  },
});

export default store;
