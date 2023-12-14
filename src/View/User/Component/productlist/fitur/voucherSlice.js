import { createSlice } from "@reduxjs/toolkit";

const voucherSlice = createSlice({
  name: "vouchers",
  initialState: {
    data: [],
    discountPercentage: null,
  },
  reducers: {
    setVoucherData: (state, action) => {
      state.data = action.payload;
    },
    setDiscountPercentage: (state, action) => {
      state.discountPercentage = action.payload;
    },
    applyVoucher: (state, action) => {
      if (state.discountPercentage) {
        state.discountPercentage -= action.payload;
      }
    },
    resetVoucher: (state) => {
      state.discountPercentage = null;
    },
  },
});

export const {
  setVoucherData,
  setDiscountPercentage,
  applyVoucher,
  resetVoucher,
} = voucherSlice.actions;
export default voucherSlice.reducer;
