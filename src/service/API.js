import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

const API_ENDPOINTS = {
  ORDER: `${API_BASE_URL}api/create-payment`,

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
  update_voucher: `${API_BASE_URL}update-voucher`,
  Voucher: `${API_BASE_URL}voucher`,
  CekVoucher: `${API_BASE_URL}check-vouchers`,
};

const register = async (username, email, password) => {
  try {
    const response = await axios.post(API_ENDPOINTS.Register, { username, email, password });

    if (response.status === 200) {
      return { status: 200 };
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
    
      return { status: 400, message: error.response.data.message || "Username or Email already exists" };
    } else {
    
      return { status: 500, message: "Internal Server Error" };
    }
  }
};


const login = async (email, password) => {
  try {
    const response = await axios.post(API_ENDPOINTS.Login, { email, password });

    if (response.status === 200) {
      const token = response.data.token;
      const uid = response.data.uid;

      return { status: 200, data: { token, uid } };
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {

      return { status: 401 };
    } else {
      
      return {
        status: 500,
        message: error.response.data.message || "Internal Server Error",
      };
    }
  }
};

const verifJWT = async () => {
  try {
    const token = localStorage.getItem("token");

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
