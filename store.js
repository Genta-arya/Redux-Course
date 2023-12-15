import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./src/View/User/Component/productlist/fitur/slice";
import productSlice from "./src/View/User/Component/productlist/fitur/productSlice";
import sortHistoryReducer from "./src/View/User/Component/productlist/fitur/sortHistorySlice";
import auth from "./src/View/User/Component/productlist/fitur/AuthSlice";
import voucherReducer from "./src/View/User/Component/productlist/fitur/voucherSlice";
import  favoritesSlice  from "./src/View/User/Component/productlist/fitur/FavSlice";


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productSlice,
    sortHistory: sortHistoryReducer,
    auth: auth,
    vouchers: voucherReducer,
    favorites: favoritesSlice,
  },
});

export default store;
