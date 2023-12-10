import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./View/User/Index";
import DetailNotFound from "./View/User/Component/404";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<DetailNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
