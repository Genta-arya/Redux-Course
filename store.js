// store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./src/View/User/Component/productlist/fitur/slice";
import productSlice from "./src/View/User/Component/productlist/fitur/productSlice";
import sortHistoryReducer from "./src/View/User/Component/productlist/fitur/sortHistorySlice";
import auth  from "./src/View/User/Component/productlist/fitur/AuthSlice";
import voucherReducer  from "./src/View/User/Component/productlist/fitur/voucherSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productSlice,
    sortHistory: sortHistoryReducer,
    auth: auth,
    vouchers: voucherReducer,
  },
});

export default store;
