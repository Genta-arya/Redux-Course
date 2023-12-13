import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const formatDate = (date) => {
  return new Date(date).toISOString().split("T")[0];
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

          const response = await fetch("https://api-ikkea-v1.vercel.app/get-history", {
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
          console.log("Data response:", data);

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

          setSpendingData(filteredData);

          if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
          }

          const dateLabels = filteredData.map((entry) =>
            formatDate(entry.time)
          );
          const spendingValues = filteredData.map((entry) => entry.price);

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
