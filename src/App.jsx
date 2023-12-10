import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./View/User/Index";
import DetailNotFound from "./View/User/Component/404";
import ErrorPage from "./View/User/Component/ErrorPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Error" element={<ErrorPage />} />
        <Route path="*" element={<DetailNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
