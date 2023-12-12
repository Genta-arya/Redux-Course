import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

const API_ENDPOINTS = {
  ORDER: `${API_BASE_URL}order`,

  STATUS: `${API_BASE_URL}order-status`,
  Login: `${API_BASE_URL}login`,
  Register: `${API_BASE_URL}register`,
  CheckEmail: `${API_BASE_URL}check-email`,
  ForgotPassowrd: `${API_BASE_URL}forgot-password`,
  VerifOtp: `${API_BASE_URL}verify-token`,
  DeleteOtp: `${API_BASE_URL}delete-token`,
  UpdatePassword: `${API_BASE_URL}update-password`,
  CheckUser: `${API_BASE_URL}get-username`,
  Gethistory: `${API_BASE_URL}get-history`,
  CekJWT: `${API_BASE_URL}jwt`,
};

const register = async (username, email, password) => {
  try {
    const response = await axios.post(API_ENDPOINTS.Register, {
      username,
      email,
      password,
    });

    if (response.status === 200) {
      return { status: 200 };
    }
  } catch (error) {
    if (error.response) {
      return { status: error.response.status, data: error.response.data };
    } else if (error.request) {
      return { status: 500 };
    } else {
      return { status: 500 };
    }
  }
};

const login = async (email, password) => {
  try {
    const response = await axios.post(API_ENDPOINTS.Login, { email, password });

    if (response.status === 200) {
      const token = response.data.token;

      return { status: 200, data: { token } };
    }
  } catch (error) {
    return { status: 401 };
  }
};

const verifJWT = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("ini token:" ,token)

    const response = await fetch(API_ENDPOINTS.CekJWT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
     
    }
  } catch (error) {
   
    throw error;
  }
};

export { API_ENDPOINTS, register, login, verifJWT };
