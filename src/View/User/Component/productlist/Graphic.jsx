import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { API_ENDPOINTS } from "../../../../service/API";

const formatDate = (date) => {
  return new Date(date).toISOString().split("T")[0];
};

const mergeItemsWithSameProductName = (history) => {
  const mergedHistory = [];

  history.forEach((item) => {
    const existingItemIndex = mergedHistory.findIndex(
      (mergedItem) =>
        mergedItem.nm_product === item.nm_product &&
        mergedItem.status === item.status
    );

    if (existingItemIndex !== -1) {
      const existingItem = mergedHistory[existingItemIndex];

      if (existingItem.id_product === item.id_product) {
        existingItem.qty += item.qty;
        existingItem.price += item.price;
      } else {
        mergedHistory.push({ ...item });
      }
    } else {
      mergedHistory.push({ ...item });
    }
  });

  return mergedHistory;
};

const SpendingOverTimeChart = () => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [spendingData, setSpendingData] = useState([]);
  const [uniqueDates, setUniqueDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem("username");

        if (username) {
          const response = await fetch(`${API_ENDPOINTS.Gethistory}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username }),
          });

          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }

          const data = await response.json();

          const uniqueDatesArray = [
            ...new Set(
              data.paymentHistory.map((entry) => formatDate(entry.time))
            ),
          ];
          setUniqueDates(uniqueDatesArray);

          if (uniqueDatesArray.length > 0) {
            setSelectedDate(uniqueDatesArray[0]);
          }

          const filteredData = data.paymentHistory.filter((entry) => {
            return formatDate(entry.time) === selectedDate;
          });

          const mergedData = mergeItemsWithSameProductName(filteredData);
          setSpendingData(mergedData);

          if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
          }

          const dateLabels = mergedData.map((entry) => formatDate(entry.time));
          const spendingValues = mergedData.map((entry) => entry.price);
          console.log(spendingValues);

          const chartType = window.innerWidth <= 600 ? "doughnut" : "bar";

          chartInstanceRef.current = new Chart(chartRef.current, {
            type: chartType,
            data: {
              labels: dateLabels,
              datasets: [
                {
                  label: "Graphic spending money",
                  data: spendingValues,
                  borderColor: "rgba(75, 192, 192, 1)",
                  borderWidth: 2,
                  fill: false,
                },
              ],
            },
            options: {
              scales: {
                x: {
                  position: "bottom",
                  title: {
                    display: true,
                    text: "Date",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Price",
                  },
                },
              },
            },
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [selectedDate]);

  return (
    <div className="mt-12 w-[100%] mb-12 p-4  ">
      <label>Select Date: </label>
      <select
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      >
        {uniqueDates.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>
      <div ref={chartContainerRef} style={{ overflowX: "auto" }}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default SpendingOverTimeChart;
