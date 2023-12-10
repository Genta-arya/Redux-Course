import React, { useEffect } from "react";

const DetailNotFound = () => {
  useEffect(() => {
    document.title = "Not Found";
  });
  const text404Style = "text-xl  text-gray-400";
  const containerStyle =
    "min-h-screen flex items-center justify-center bg-gray-900";
  return (
    <div className={containerStyle}>
      <div className="text-center">
        <h2 className={text404Style}>404 | Halaman tidak ditemukan</h2>
      </div>
    </div>
  );
};

export default DetailNotFound;
