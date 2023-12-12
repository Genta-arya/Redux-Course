import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../../../../service/API";
import {
  selectShoppingHistory,
  selectSortOrder,
  selectSortType,
  selectTotalHistory,
  setShoppingHistory,
  setSortOrder,
  setSortType,
  sortShoppingHistory,
} from "./fitur/sortHistorySlice";
import useAuthCheck from "../../../../service/AuthHook";
import {  setAuthenticated } from "./fitur/AuthSlice";


const History = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const sortType = useSelector(selectSortType);
  const sortOrder = useSelector(selectSortOrder);
  const shoppingHistory = useSelector(selectShoppingHistory);
  const totalHistory = useSelector(selectTotalHistory);

  const username = localStorage.getItem("username");
  useAuthCheck()

  const mergeItemsWithSameProductName = (history) => {
    const mergedHistory = [];

    history.forEach((item) => {
      const existingItemIndex = mergedHistory.findIndex(
        (mergedItem) =>
          mergedItem.nm_product === item.nm_product &&
          mergedItem.status === item.status
      );

      if (existingItemIndex !== -1) {
        mergedHistory[existingItemIndex].qty += item.qty;
      } else {
        mergedHistory.push({ ...item });
      }
    });

    return mergedHistory;
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.post(`${API_ENDPOINTS.Gethistory}`, {
        username,
      });

      if (response.status === 200) {
        const data = response.data;
        const mergedHistory = mergeItemsWithSameProductName(
          data.paymentHistory || []
        );
        dispatch(setShoppingHistory(mergedHistory));
      } else {
        console.error("Failed to fetch shopping history");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchHistory();

    const intervalId = setInterval(() => {
      fetchHistory();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [username, dispatch]);

  const convertToUSD = (price) => {
    const exchangeRate = 15000;
    return (price / exchangeRate).toFixed(2);
  };

  const formatTime = (time) => {
    const formattedTime = new Date(time).toLocaleString();
    return formattedTime;
  };

  const navigateToHome = () => {
    navigate("/shop");
  };

  const sortShoppingHistoryHandler = () => {
    dispatch(sortShoppingHistory());
  };

  const getStatusColorClass = (status) => {
    switch (status) {
      case "pending":
        return "text-orange-500";
      case "settled":
        return "text-green-500";
      case "failed":
        return "text-red-500";

      case "canceled":
        return "text-red-500";
      case "expired":
        return "text-red-500";

      default:
        return "";
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex mx-auto items-center gap-8 lg:p-0 md:p-0 p-3">
        <h2
          className="text-base font-bold mb-4 cursor-pointer"
          onClick={navigateToHome}
        >
          <FaArrowLeft />
        </h2>

        {username ? (
          <h2 className="text-base font-bold mb-4">
            Shopping History, {username}
          </h2>
        ) : (
          <h2 className="text-base font-bold mb-4">Shopping History</h2>
        )}
      </div>

      {loading ? (
        <div className="bg-white p-4 rounded shadow-md">
          <div className="animate-pulse">
            <div className="flex items-center border-b mb-4">
              <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
              <div className="flex-1">
                <div className="w-20 h-4 bg-gray-300 rounded mb-1"></div>
                <div className="w-16 h-2 bg-gray-300 rounded"></div>
              </div>
            </div>

            <div className="flex items-center border-b mb-4">
              <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
              <div className="flex-1">
                <div className="w-20 h-4 bg-gray-300 rounded mb-1"></div>
                <div className="w-16 h-2 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="flex justify-end mb-4">
            <button
              className={`mr-2 ${sortType === "name" && "font-bold"}`}
              onClick={() => {
                dispatch(setSortType("name"));
                dispatch(setSortOrder(sortOrder === "asc" ? "desc" : "asc"));
                sortShoppingHistoryHandler();
              }}
            >
              Sort History {sortType === "name" && sortOrder === "asc" && "▲"}
              {sortType === "name" && sortOrder === "desc" && "▼"}
            </button>
          </div>

          {shoppingHistory.length === 0 ? (
            <p>No shopping history available.</p>
          ) : (
            <table className="table table-xs table-pin-rows table-pin-cols bg-slate-100">
              <thead className="">
                <tr className=" ">
                  <th className="py-2 px-4 border-b">No</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Image</th>
                  <th className="py-2 px-4 border-b">Qty</th>
                  <th className="py-2 px-4 border-b">Price</th>
                  <th className="py-2 px-4 border-b">Order Time</th>
                  <th className="py-2 px-4 border-b">Status</th>
                </tr>
              </thead>

              <tbody>
                {shoppingHistory.map((historyItem, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td
                      className={`py-2 px-4 border-b ${getStatusColorClass(
                        historyItem.status
                      )}`}
                    >
                      {historyItem.nm_product}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <img
                        src={historyItem.image}
                        alt={historyItem.nm_product}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">{historyItem.qty}</td>
                    <td className="py-2 px-4 border-b">
                      $ {convertToUSD(historyItem.price)}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {formatTime(historyItem.time)}
                    </td>
                    <td
                      className={`py-2 px-4 border-b ${getStatusColorClass(
                        historyItem.status
                      )}`}
                    >
                      {historyItem.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default History;
