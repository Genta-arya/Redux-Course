

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  voucherData: null, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setVoucherData: (state, action) => {
      state.voucherData = action.payload;
    },
  },
});

export const { setAuthenticated, setVoucherData } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectVoucherData = (state) => state.auth.voucherData;

export default authSlice.reducer;
