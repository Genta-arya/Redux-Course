import React from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import HomePage from "./View/User/Index";
import DetailNotFound from "./View/User/Component/404";
import ErrorPage from "./View/User/Component/ErrorPage";
import History from "./View/User/Component/productlist/History";
import LoginForm from "./View/User/Auth/Login";
import Register from "./View/User/Auth/Register";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/history" element={<History/>} />
        <Route path="/Error" element={<ErrorPage />} />
        <Route path="*" element={<DetailNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
