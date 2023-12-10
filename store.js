// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./src/View/User/Component/productlist/fitur/slice"; 

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
