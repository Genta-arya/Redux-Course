import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from "react-spinners";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from "../../../service/API";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const [loginErrorServer, setLoginErrorServer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const response = await register(username, email, password);

    if (response.status === 200) {
      setUsername("");
      setEmail("");
      setPassword("");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      toast.success("Registrasi berhasil", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Registrasi gagal Email atau Username telah digunakan.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-400 p-5">
      <div className="bg-white w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/4 p-8 rounded-3xl shadow-2xl drop-shadow-2xl shadow-black border-2 border-black">
        <div className="text-center mb-6 font-extrabold">IKKEA Register</div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label className="block text-gray-600 mt-4">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Username
            </label>
            <input
              type="text"
              className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:border-blue-500"
              value={username}
              placeholder="Enter your username"
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="relative">
            <label className="block text-gray-600 mt-4">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:border-blue-500"
              value={email}
              placeholder="example@email.com"
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="relative">
            <label className="block text-gray-600 mt-4">
              <FontAwesomeIcon icon={faLock} className="mr-2" />
              Password
            </label>
            <div className="flex">
              <input
                type={isPasswordVisible ? "text" : "password"}
                className="w-full p-2 pl-10 border rounded-l-md focus:outline-none focus:border-blue-500"
                value={password}
                placeholder="********"
                onChange={handlePasswordChange}
                required
              />
              <button
                type="button"
                className="p-2 bg-gray-200 rounded-r-md hover:bg-gray-300"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon
                  icon={isPasswordVisible ? faEyeSlash : faEye}
                />
              </button>
            </div>
          </div>

          {loginError && (
            <p className="text-red-500 text-sm items-center justify-center flex">
              {loginError}
            </p>
          )}
          {loginErrorServer && (
            <p className="text-red-500 text-sm items-center justify-center flex">
              {loginErrorServer}
            </p>
          )}
          <button
            type="submit"
            className={`w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-600 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <ClipLoader color="white" loading={isLoading} size={25} />
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
