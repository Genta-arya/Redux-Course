import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/images.png";

const ErrorPage = ({ error }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!error) {
      navigate("/");
    }
  }, [error, navigate]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <img src={logo} alt="Logo" className="mx-auto mb-4 h-72 w-72" />
          <h1 className="text-4xl text-red-500 mb-2">Error Details</h1>
          <p className="text-gray-700 mb-4">
            {" "}
            We're sorry, but it seems like there was an error.
          </p>
          <p className="text-gray-700">Please try again later.</p>
          <button
            onClick={() => navigate("/Error")}
            className="bg-gray-800 text-white px-4 py-2 rounded mt-4 hover:bg-gray-700 focus:outline-none focus:ring focus:border-blue-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default ErrorPage;
