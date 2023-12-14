import React from "react";

const VoucherForm = ({
  handleApplyVoucher,
  enteredVoucher,
  voucherError,
  setEnteredVoucher,
  isCheckboxChecked,
}) => {
  return (
    <div className="relative flex-1 ">
      <label className="block text-sm font-semibold text-gray-600 mb-1">
        Voucher Code
      </label>
      <div className="text-gray-500 mb-2">
        <div className="text-xs">* check your profile to get a voucher</div>
      </div>
      <div className="flex">
        <input
          type="text"
          value={enteredVoucher}
          onChange={(e) => setEnteredVoucher(e.target.value)}
          className="w-1/2 p-2 border border-gray-300 rounded-l focus:outline-none focus:border-blue-500"
          placeholder="Enter your voucher code"
        />
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-700 focus:outline-none ${
            !isCheckboxChecked && "cursor-not-allowed opacity-50"
          }`}
          onClick={handleApplyVoucher}
          disabled={!isCheckboxChecked}
        >
          Apply
        </button>
      </div>
      <div className="text-sm text-red-500">{voucherError}</div>
    </div>
  );
};

export default VoucherForm;
