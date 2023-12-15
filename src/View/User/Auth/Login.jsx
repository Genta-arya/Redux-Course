import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { API_ENDPOINTS, login } from "../../../service/API";
import useAuthCheck from "../../../service/AuthHook";
import { selectIsAuthenticated } from "../Component/productlist/fitur/AuthSlice";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginErrorServer, setLoginErrorServer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);

  const [isEnterOTPOpen, setIsEnterOTPOpen] = useState(false);
  const [otp, setOTP] = useState("");
  const [tokenJWT, setJWT] = useState("");
  const [UID, setUID] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [isNewPasswordModalOpen, setIsNewPasswordModalOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    localStorage.setItem("token", tokenJWT);
    localStorage.setItem("uid", UID);
  }, [tokenJWT]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await login(email, password);

      if (response.status === 200) {
        setLoginError("");
        setLoginErrorServer("");
        setJWT(response.data.token);
        setUID(response.data.uid);
        

        const usernameResponse = await fetch(`${API_ENDPOINTS.CheckUser}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (usernameResponse.ok) {
          const { username } = await usernameResponse.json();
          localStorage.setItem("username", username);
          navigate("/shop");
        }
      } else {
        if (response.status === 401) {
          toast.error("Incorrect username or password", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
         
        }
        else if (response.status === 500) {
          toast.error("Error connection server", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
         
        }
      }
    } catch (error) {
      // Handle other errors
      console.error("Error during login:", error);
      toast.error("Error connection server", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setIsForgotPasswordModalOpen(true);
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const closeForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(false);
  };
  const handleSendOTP = async () => {
    try {
      const checkEmailResponse = await fetch(`${API_ENDPOINTS.CheckEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (checkEmailResponse.ok) {
        const { exists } = await checkEmailResponse.json();

        if (exists) {
          await new Promise((resolve) => setTimeout(resolve, 0));

          openEnterOTPModal();

          const response = await fetch(`${API_ENDPOINTS.ForgotPassowrd}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          });

          if (response.ok) {
            toast.success("OTP sent successfully", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          } else {
            toast.error("Failed to send OTP", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        } else {
          toast.warn("Email is not registered", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } else {
        toast.error("Failed to check email", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Failed to send OTP:", error);
      toast.error("An error occurred while sending OTP.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const openEnterOTPModal = () => {
    setIsForgotPasswordModalOpen(false);
    setIsEnterOTPOpen(true);
  };

  const closeEnterOTPModal = () => {
    setIsEnterOTPOpen(false);
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await fetch(`${API_ENDPOINTS.VerifOtp}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        const deleteTokenResponse = await fetch(`${API_ENDPOINTS.DeleteOtp}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (deleteTokenResponse.ok) {
          setOTP("");
          toast.success("OTP is Valid.", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          openEnterNewPasswordModal();
        } else {
          console.error("Failed to delete the token.");
          toast.error("Failed to delete the token. Please try again.", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } else {
        toast.warn("OTP is not valid. Please try again check your OTP.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Failed to verify OTP:", error);
      toast.error("An error occurred while verifying OTP.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const openEnterNewPasswordModal = () => {
    setIsEnterOTPOpen(false);
    setIsForgotPasswordModalOpen(false);
    setIsNewPasswordModalOpen(true);
  };

  const closeEnterNewPasswordModal = () => {
    setIsNewPasswordModalOpen(false);
  };

  const handleSetNewPassword = async () => {
    try {
      const response = await fetch(`${API_ENDPOINTS.UpdatePassword}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });

      if (response.ok) {
        toast.success("Your new password has been set.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setNewPassword("");
        closeEnterNewPasswordModal();
      } else {
        toast.error("Failed to set a new password. Please try again.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Failed to set a new password:", error);
      toast.error("An error occurred while setting a new password.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-400 p-5">
      <div className="bg-white w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/4 p-8 rounded-3xl shadow-2xl drop-shadow-2xl shadow-black border-2 border-black">
        <div className="text-center mb-6 font-extrabold">HKKS LOGIN</div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label className="block text-gray-600 mt-12">
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
            <label className="block text-gray-600">
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
              "Login"
            )}
          </button>

          <div className="text-center flex justify-center gap-3">
            <button
              type="button"
              className="text-gray-500 hover:underline"
              onClick={handleForgotPassword}
            >
              Lupa Password?
            </button>
            <button
              type="button"
              className="text-gray-500 hover:underline "
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </form>

        {isForgotPasswordModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center rounded-3xl justify-center bg-gray-600 bg-opacity-75 z-50 ">
            <div className="bg-white w-full  p-8 rounded-2xl shadow-2xl">
              <h2 className="text-xl font-semibold mb-4">Lupa Password</h2>

              <p className="text-gray-600 mb-4">
                Masukkan email Anda dan kami akan mengirimkan OTP untuk mengatur
                ulang kata sandi Anda.
              </p>
              <div className="relative">
                <label className="block text-gray-600">
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
              <div className="text-center mt-4">
                <button
                  type="button"
                  className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handleSendOTP}
                >
                  {isLoading ? (
                    <ClipLoader color="white" loading={isLoading} size={25} />
                  ) : (
                    "Kirim OTP"
                  )}
                </button>
              </div>
              <div className="text-center mt-4">
                <button
                  type="button"
                  className="text-blue-500 hover:underline"
                  onClick={closeForgotPasswordModal}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}

        {isEnterOTPOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center rounded-3xl justify-center bg-gray-600 bg-opacity-75 z-50">
            <div className="bg-white w-full  p-8 rounded-2xl shadow-2xl">
              <h2 className="text-xl font-semibold mb-4">Masukkan OTP</h2>
              <p className="text-gray-600 mb-4">
                Kami telah mengirimkan OTP ke email Anda. Silakan masukkan OTP
                di sini.
              </p>
              <div className="relative">
                <label className="block text-gray-600">OTP</label>
                <input
                  type="text"
                  className="w-full p-2 pl-2 border rounded-md focus:outline-none focus:border-blue-500"
                  value={otp}
                  placeholder="Masukkan OTP"
                  onChange={(e) => setOTP(e.target.value)}
                  required
                />
              </div>
              <div className="text-center mt-4">
                <button
                  type="button"
                  className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handleVerifyOTP}
                >
                  {isLoading ? (
                    <ClipLoader color="white" loading={isLoading} size={25} />
                  ) : (
                    "Verifikasi OTP"
                  )}
                </button>
              </div>
              <div className="text-center mt-4">
                <button
                  type="button"
                  className="text-blue-500 hover:underline"
                  onClick={closeEnterOTPModal}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}

        {isNewPasswordModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center rounded-3xl justify-center bg-gray-600 bg-opacity-75 z-50">
            <div className="bg-white w-full p-8 rounded-2xl shadow-2xl">
              <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
              <p className="text-gray-600 mb-4">
                Enter your new password below to reset your password.
              </p>
              <div className="relative">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                  value={newPassword}
                  placeholder="New Password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute  bottom-1 right-0 p-2  rounded-md  flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon
                    icon={isPasswordVisible ? faEyeSlash : faEye}
                    className={`text-${
                      isPasswordVisible ? "gray-500" : "blue-500"
                    }`}
                  />
                </button>
              </div>
              <div className="text-center mt-4">
                <button
                  type="button"
                  className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600`}
                  onClick={handleSetNewPassword}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ClipLoader color="white" loading={isLoading} size={25} />
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </div>
              <div className="text-center mt-4">
                <button
                  type="button"
                  className="text-blue-500 hover:underline"
                  onClick={closeEnterNewPasswordModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
