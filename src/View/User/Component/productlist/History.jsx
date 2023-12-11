import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../../../../service/API";

const History = () => {
  const [shoppingHistory, setShoppingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
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

          setShoppingHistory(mergedHistory);
        } else {
          console.error("Failed to fetch shopping history");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [username]);

  const convertToUSD = (price) => {
    const exchangeRate = 15000;
    return (price / exchangeRate).toFixed(2);
  };

  const formatTime = (time) => {
    const formattedTime = new Date(time).toLocaleString();
    return formattedTime;
  };

  const mergeItemsWithSameProductName = (history) => {
    const mergedHistory = [];

    history.forEach((item) => {
      const existingItemIndex = mergedHistory.findIndex(
        (mergedItem) => mergedItem.nm_product === item.nm_product
      );

      if (existingItemIndex !== -1) {
        mergedHistory[existingItemIndex].qty += item.qty;
      } else {
        mergedHistory.push({ ...item });
      }
    });

    return mergedHistory;
  };

  const navigateToHome = () => {
    navigate("/");
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
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          {shoppingHistory.length === 0 ? (
            <p>No shopping history available.</p>
          ) : (
            <table className="table table-xs table-pin-rows table-pin-cols bg-slate-100">
              <thead className="">
                <tr className=" ">
                  <th className="py-2 px-4 border-b">No</th>
                  <th className="py-2 px-4 border-b">Name Product</th>
                  <th className="py-2 px-4 border-b">Image</th>
                  <th className="py-2 px-4 border-b">Qty</th>
                  <th className="py-2 px-4 border-b">Price (USD)</th>
                  <th className="py-2 px-4 border-b">Order Time</th>
                  <th className="py-2 px-4 border-b"></th>
                </tr>
              </thead>

              <tbody>
                {shoppingHistory.map((historyItem, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">
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
                      {convertToUSD(historyItem.price)}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {formatTime(historyItem.time)}
                    </td>
                    <td className="py-2 px-4 border-b">{index + 1}</td>
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
