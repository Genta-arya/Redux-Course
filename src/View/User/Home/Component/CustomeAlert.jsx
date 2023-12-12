import React from "react";

function CustomAlert({ message, onClose }) {
  return (
    <div className="bg-red-500 text-white rounded-md p-4 shadow-md flex justify-between items-center mt-12">
      <p>{message}</p>
      <button
        onClick={onClose}
        className="bg-white text-red-500 px-2 py-1 rounded hover:bg-red-600 hover:text-white transition duration-300"
      >
        Close
      </button>
    </div>
  );
}

export default CustomAlert;