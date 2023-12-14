import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setDiscountPercentage, setVoucherData } from "./fitur/voucherSlice";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../../../../service/API";

const VoucherModal = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const voucherData = useSelector((state) => state.vouchers.data);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const uid = localStorage.getItem("uid");

    if (uid) {
      axios
        .post(`${API_ENDPOINTS.Voucher}`, { user_uid: uid, is_used: 0 }) 
        .then((response) => {
         

          if (response && response.data) {
            dispatch(setVoucherData(response.data));

            const discountPercentages = response.data.map(
              (voucher) => voucher.discount_percentage
            );

            const discountPercentage =
              response.data.length > 0
                ? response.data[0].discount_percentage
                : null;
            dispatch(setDiscountPercentage(discountPercentage));
          }

          setIsLoading(false);
        })
        .catch((error) => {
          console.error("API Error:", error);
          setIsLoading(false);
        });
    }
  }, [dispatch]);

  useEffect(() => {
    const isUsedInfo = voucherData.map((voucher) => voucher.is_used);

    localStorage.setItem("voucherIsUsedInfo", JSON.stringify(isUsedInfo));
  }, [voucherData]);

  const handleCopyVoucherCode = (voucherCode) => {
    navigator.clipboard.writeText(voucherCode);
    setIsCopied(true);

    toast.success("Voucher code copied!");
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-md w-96 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Your Voucher Discount
        </h2>
        {isLoading ? (
          <p className="text-center text-gray-600">Loading voucher data...</p>
        ) : (
          <div>
            {voucherData.filter((voucher) => voucher.is_used === 0).length >
            0 ? (
              voucherData
                .filter((voucher) => voucher.is_used === 0)
                .map((voucher, index) => (
                  <div key={index} className="mb-4">
                    <p className="text-lg font-semibold">
                      Discount Percentage: {voucher.discount_percentage * 100}%
                    </p>

                    <div className="flex items-center border border-gray-300 p-2 rounded">
                      <p className="text-sm text-gray-600 mr-2">
                        Voucher Code: {voucher.voucher_code}
                      </p>
                      <button
                        className="text-green-500 hover:text-green-700 focus:outline-none"
                        onClick={() =>
                          handleCopyVoucherCode(voucher.voucher_code)
                        }
                      >
                        {isCopied ? <FaCheck /> : "Copy"}
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">
                      Expiration Date:{" "}
                      <span className="text-red-500">
                        {new Date(voucher.expiration_date).toLocaleDateString()}
                      </span>
                    </p>
                  </div>
                ))
            ) : (
              <p className="text-center text-gray-600">
                You do not have any available vouchers.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VoucherModal;
